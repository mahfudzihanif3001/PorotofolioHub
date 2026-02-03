import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import PortfolioItem from '@/models/PortfolioItem';
import { getUserFromRequest } from '@/lib/auth';

// GET /api/portfolio - Get all portfolio items for current user
export async function GET(request: NextRequest) {
  try {
    const payload = getUserFromRequest(request);
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const items = await PortfolioItem.find({ userId: payload.userId })
      .sort({ order: 1, createdAt: -1 });

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Get portfolio error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/portfolio - Create new portfolio item
export async function POST(request: NextRequest) {
  try {
    const payload = getUserFromRequest(request);
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { title, description, category, attachments, techStack, startDate, endDate } = body;

    // Validation
    if (!title || !category) {
      return NextResponse.json(
        { error: 'Title and category are required' },
        { status: 400 }
      );
    }

    // Get the highest order number for this user
    const lastItem = await PortfolioItem.findOne({ userId: payload.userId })
      .sort({ order: -1 });
    const newOrder = lastItem ? lastItem.order + 1 : 0;

    const item = await PortfolioItem.create({
      userId: payload.userId,
      title,
      description: description || '',
      category,
      attachments: attachments || [],
      techStack: techStack || [],
      startDate,
      endDate,
      order: newOrder,
    });

    return NextResponse.json(
      {
        message: 'Portfolio item created successfully',
        item,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Create portfolio error:', error);
    
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
