import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import PortfolioItem from '@/models/PortfolioItem';
import { getUserFromRequest } from '@/lib/auth';
import { deleteMultipleFromCloudinary } from '@/lib/cloudinary';

// GET /api/admin/users - Get all users (Super Admin only)
export async function GET(request: NextRequest) {
  try {
    const payload = getUserFromRequest(request);
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!payload.isSuperAdmin) {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    await connectDB();

    const users = await User.find({ isSuperAdmin: false })
      .select('-password')
      .sort({ createdAt: -1 });

    // Get portfolio item count for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const itemCount = await PortfolioItem.countDocuments({ userId: user._id });
        return {
          ...user.toObject(),
          portfolioItemCount: itemCount,
        };
      })
    );

    return NextResponse.json({ users: usersWithStats });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users?userId=xxx - Delete user and all their data (Super Admin only)
export async function DELETE(request: NextRequest) {
  try {
    const payload = getUserFromRequest(request);
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!payload.isSuperAdmin) {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Find user
    const user = await User.findById(userId);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (user.isSuperAdmin) {
      return NextResponse.json(
        { error: 'Cannot delete Super Admin' },
        { status: 403 }
      );
    }

    // Get all portfolio items to delete their Cloudinary files
    const items = await PortfolioItem.find({ userId });
    
    // Collect all Cloudinary public IDs
    const publicIds: string[] = [];
    items.forEach((item) => {
      if (item.attachments) {
        item.attachments.forEach((attachment) => {
          if (attachment.publicId) {
            publicIds.push(attachment.publicId);
          }
        });
      }
    });

    // Delete from Cloudinary
    if (publicIds.length > 0) {
      await deleteMultipleFromCloudinary(publicIds);
    }

    // Delete all portfolio items
    await PortfolioItem.deleteMany({ userId });

    // Delete user
    await User.findByIdAndDelete(userId);

    return NextResponse.json({
      message: 'User and all their data deleted successfully',
    });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
