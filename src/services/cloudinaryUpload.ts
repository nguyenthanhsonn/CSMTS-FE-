/**
 * Nén ảnh bằng Canvas API trước khi upload.
 * - Chỉ áp dụng cho file image/*.
 * - Giới hạn max dimension 1920px, quality 0.82.
 * - Fallback về file gốc nếu nén thất bại hoặc file không phải ảnh.
 */
async function compressImageFile(file: File): Promise<File> {
  if (!file.type.startsWith('image/')) return file;

  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const MAX_DIM = 1920;
      let { width, height } = img;

      if (width > MAX_DIM || height > MAX_DIM) {
        if (width >= height) {
          height = Math.round((height * MAX_DIM) / width);
          width = MAX_DIM;
        } else {
          width = Math.round((width * MAX_DIM) / height);
          height = MAX_DIM;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(file);
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);

      // Giữ định dạng gốc; PNG giữ nguyên (lossless), JPEG nén quality 0.82
      const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
      const quality = outputType === 'image/png' ? undefined : 0.82;

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file);
            return;
          }
          // Chỉ dùng bản nén nếu nhỏ hơn file gốc
          if (blob.size >= file.size) {
            resolve(file);
            return;
          }
          const compressed = new File([blob], file.name, { type: outputType, lastModified: Date.now() });
          resolve(compressed);
        },
        outputType,
        quality,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file);
    };

    img.src = objectUrl;
  });
}

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

export interface UploadEvidenceOptions {
  /** Callback trả về % tiến trình upload (0–100). */
  onProgress?: (percent: number) => void;
}

/**
 * Upload minh chứng lên Cloudinary.
 * - Tự động nén ảnh trước khi upload (image/*), giữ nguyên PDF.
 * - Hỗ trợ callback `onProgress` để hiển thị % tiến trình thực tế.
 */
export async function uploadEvidenceFile(
  file: File,
  options?: UploadEvidenceOptions,
): Promise<{ secureUrl: string; publicId: string }> {
  // Bước 1: Nén ảnh (chỉ image/*, fallback file gốc nếu lỗi)
  const fileToUpload = await compressImageFile(file);

  const formData = new FormData();
  formData.append('file', fileToUpload);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  // Bước 2: Upload qua XHR để bắt onprogress
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    if (options?.onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          options.onProgress!(percent);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve({ secureUrl: data.secure_url, publicId: data.public_id });
        } catch {
          reject(new Error('Phản hồi từ Cloudinary không hợp lệ.'));
        }
      } else {
        reject(new Error(`Upload file lên Cloudinary thất bại (HTTP ${xhr.status}).`));
      }
    };

    xhr.onerror = () => reject(new Error('Lỗi kết nối khi upload file lên Cloudinary.'));
    xhr.ontimeout = () => reject(new Error('Upload file bị timeout.'));

    xhr.open('POST', CLOUDINARY_UPLOAD_URL);
    xhr.send(formData);
  });
}
