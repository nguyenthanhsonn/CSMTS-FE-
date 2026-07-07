const rawCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const rawPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

if (!rawCloudName || !rawPreset) {
  throw new Error(
    'Thiếu cấu hình Cloudinary: kiểm tra lại NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME và NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET trong file .env'
  );
}

const CLOUDINARY_CLOUD_NAME = rawCloudName;
const CLOUDINARY_UPLOAD_PRESET = rawPreset;

const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`;

/** Upload minh chứng lên Cloudinary. */
export async function uploadEvidenceFile(file: File): Promise<{ secureUrl: string; publicId: string }> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(CLOUDINARY_UPLOAD_URL, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Upload file lên Cloudinary thất bại');
  }

  const data = await res.json();

  return {
    secureUrl: data.secure_url,
    publicId: data.public_id,
  };
}
