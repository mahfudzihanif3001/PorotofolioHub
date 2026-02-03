import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import PortfolioItem from '@/models/PortfolioItem';
import { getUserFromRequest } from '@/lib/auth';
import { deleteFromCloudinary } from '@/lib/cloudinary';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/portfolio/[id] - Get single portfolio item
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const payload = getUserFromRequest(request);
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;
    const item = await PortfolioItem.findOne({
      _id: id,
      userId: payload.userId,
    });

    if (!item) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ item });
  } catch (error) {
    console.error('Get portfolio item error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/portfolio/[id] - Update portfolio item
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const payload = getUserFromRequest(request);
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;
    const body = await request.json();

    // Fields that can be updated
    const allowedFields = [
      'title',
      'description',
      'category',
      'attachments',
      'techStack',
      'startDate',
      'endDate',
      'order',
      'isVisible',
    ];

    // Filter only allowed fields
    const updateData: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    const item = await PortfolioItem.findOneAndUpdate(
      { _id: id, userId: payload.userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!item) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Portfolio item updated successfully',
      item,
    });
  } catch (error: unknown) {
    console.error('Update portfolio error:', error);
    
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/portfolio/[id] - Delete portfolio item
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const payload = getUserFromRequest(request);
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;
    const item = await PortfolioItem.findOneAndDelete({
      _id: id,
      userId: payload.userId,
    });

    if (!item) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    // Delete files from Cloudinary
    if (item.attachments && item.attachments.length > 0) {
      for (const attachment of item.attachments) {
        if (attachment.publicId) {
          await deleteFromCloudinary(attachment.publicId);
        }
      }
    }

    return NextResponse.json({
      message: 'Portfolio item deleted successfully',
    });
  } catch (error) {
    console.error('Delete portfolio error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
