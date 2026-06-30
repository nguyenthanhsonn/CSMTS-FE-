import axios from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function request<T>(
  url: string,
  options: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: any;
  },
  contextMessage: string
): Promise<T> {
  try {
    const res = await axiosInstance({
      url,
      method: options.method,
      headers: options.headers,
      data: options.body,
    });
    return res.data;
  } catch (error: any) {
    console.error(`API Error Details [${contextMessage}]:`, error);

    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const responseData = error.response?.data as any;
      const errorMessage = responseData?.message || responseData?.error || '';

      if (status === 401 || status === 403) {
        throw new Error('Phiên đăng nhập đã hết hạn hoặc bạn không có quyền thực hiện hành động này. Vui lòng đăng nhập lại.');
      }
      if (status === 404) {
        throw new Error('Không tìm thấy dữ liệu yêu cầu.');
      }
      if (status && status >= 500) {
        throw new Error('Hệ thống đang gặp sự cố. Vui lòng thử lại sau ít phút.');
      }
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Không thể kết nối tới máy chủ. Vui lòng kiểm tra lại kết nối mạng của bạn.');
      }

      throw new Error(errorMessage || `Không thể hoàn tất ${contextMessage}. Vui lòng thử lại.`);
    }

    throw new Error(error.message || `Đã xảy ra sự cố khi ${contextMessage}. Vui lòng thử lại.`);
  }
}
