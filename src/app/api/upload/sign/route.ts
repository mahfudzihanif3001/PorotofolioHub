import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { generateUploadSignature } from '@/lib/cloudinary';

// POST /api/upload/sign - Get Cloudinary upload signature
export async function POST(request: NextRequest) {
  try {
    const payload = getUserFromRequest(request);
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const folder = body.folder || `portfolio/${payload.userId}`;

    const signatureData = generateUploadSignature(folder);

    return NextResponse.json(signatureData);
  } catch (error) {
    console.error('Upload signature error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
