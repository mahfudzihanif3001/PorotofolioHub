import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinarySignature {
  signature: string;
  timestamp: number;
  cloudName: string;
  apiKey: string;
  folder: string;
}

export function generateUploadSignature(
  folder: string = "portfolio",
): CloudinarySignature {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder,
    },
    process.env.CLOUDINARY_API_SECRET!,
  );

  return {
    signature,
    timestamp,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    folder,
  };
}

export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  try {
    // Try deleting as image first, then as raw (for PDFs)
    let result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== "ok") {
      result = await cloudinary.uploader.destroy(publicId, { 
        resource_type: "raw" 
      });
    }
    return result.result === "ok";
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    return false;
  }
}

export async function deleteMultipleFromCloudinary(
  publicIds: string[],
): Promise<void> {
  try {
    // Delete images
    await cloudinary.api.delete_resources(publicIds, {
      type: "upload",
      resource_type: "image"
    }).catch(() => {});
    
    // Delete raw files (PDFs)
    await cloudinary.api.delete_resources(publicIds, {
      type: "upload",
      resource_type: "raw"
    }).catch(() => {});
    
    // Delete videos
    await cloudinary.api.delete_resources(publicIds, {
      type: "upload",
      resource_type: "video"
    }).catch(() => {});
  } catch (error) {
    console.error("Error deleting multiple from Cloudinary:", error);
  }
}

// Helper to generate public URL from public_id
export function getPublicUrl(publicId: string, resourceType: 'image' | 'raw' | 'video' = 'image'): string {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  
  if (resourceType === 'raw') {
    // For PDFs and other raw files
    return `https://res.cloudinary.com/${cloudName}/raw/upload/${publicId}`;
  } else if (resourceType === 'video') {
    return `https://res.cloudinary.com/${cloudName}/video/upload/${publicId}`;
  } else {
    // For images
    return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;
  }
}

// Generate a signed URL for accessing raw files (PDFs) that require authentication
export function generateSignedUrl(publicId: string, resourceType: 'raw' | 'image' | 'video' = 'raw'): string {
  return cloudinary.url(publicId, {
    resource_type: resourceType,
    type: 'upload',
    sign_url: true,
    secure: true,
  });
}

export default cloudinary;
