/**
 * Tập trung xử lý và phân loại lỗi cho toàn bộ ứng dụng.
 *
 * Nguyên tắc:
 * - Lỗi kỹ thuật (network, 5xx, stack trace...) chỉ log ra console — KHÔNG bao giờ hiển thị cho người dùng.
 * - Lỗi nghiệp vụ từ BE (4xx kèm message tiếng Việt, rõ ràng) được hiển thị nếu an toàn.
 * - Tất cả nơi show toast lỗi PHẢI đi qua getUserFriendlyError().
 */

// ─── Các pattern kỹ thuật cần che đi ──────────────────────────────────────────

/** Regex phát hiện các chuỗi kỹ thuật không nên hiển thị cho user */
const TECHNICAL_PATTERNS = [
  /is not a function/i,
  /cannot read (property|properties)/i,
  /\bundefined\b/,
  /\bnull\b/,
  /internal server error/i,
  /axioserror/i,
  /request failed with status code/i,
  /network error/i,
  /failed to fetch/i,
  /unable to connect/i,
  /econnrefused/i,
  /econnreset/i,
  /etimedout/i,
  /socket hang up/i,
  // URL / IP patterns
  /https?:\/\//i,
  /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/,
  // Stack trace fragments
  /at \w+\s*\(/,
  /\.ts:\d+/,
  /\.js:\d+/,
  // Java/Node exception class names
  /Exception:/i,
  /Error:/,
  // Port numbers in context
  /:\d{4,5}\//,
];

/** Kiểm tra xem một message có an toàn để hiển thị cho user không */
function isSafeUserMessage(message: string): boolean {
  if (!message || typeof message !== 'string') return false;
  if (message.length > 300) return false;

  const normalized = message.trim();
  if (normalized.length < 3) return false;

  return !TECHNICAL_PATTERNS.some((pattern) => pattern.test(normalized));
}

// ─── Logger ────────────────────────────────────────────────────────────────────

/**
 * Log lỗi kỹ thuật để dev debug — không bao giờ dùng để hiển thị cho user.
 * Trong production có thể thay thế bằng Sentry / LogRocket.
 */
export function logError(context: string, error: unknown): void {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context}]`, error);
  } else {
    // Production: chỉ log thông tin tối thiểu, không log chi tiết kỹ thuật ra console
    // TODO: Integrate with Sentry / LogRocket here
    // Sentry.captureException(error, { tags: { context } });
    const summary =
      error instanceof Error
        ? `${error.name}: ${error.message.slice(0, 100)}`
        : String(error).slice(0, 100);
    console.error(`[${context}] ${summary}`);
  }
}

// ─── Friendly message mapper ───────────────────────────────────────────────────

/**
 * Nhận lỗi gốc (từ catch) và trả về message thân thiện để hiển thị cho người dùng.
 *
 * @param error      - Lỗi từ catch block
 * @param fallback   - Message mặc định nếu không map được
 * @returns          - String message an toàn để hiển thị trực tiếp lên UI / toast
 */
export function getUserFriendlyError(
  error: unknown,
  fallback = 'Đã có lỗi xảy ra. Vui lòng thử lại sau.'
): string {
  // Log đầy đủ lỗi kỹ thuật để dev debug
  console.error('[API Error]:', error);

  if (!error) return fallback;

  // ── Trích xuất thông tin từ error object ──────────────────────────────────
  let rawMessage = '';
  let statusCode: number | undefined;
  let validationErrors: unknown[] = [];

  if (error instanceof Error) {
    rawMessage = error.message || '';
    if ('statusCode' in error) statusCode = (error as any).statusCode as number;
    if ('errors' in error && Array.isArray((error as any).errors)) {
      validationErrors = (error as any).errors;
    }
    // Dual-message: dùng userMessage (friendly) nếu interceptor đã gắn sẵn
    if ('userMessage' in error && typeof (error as any).userMessage === 'string') {
      return (error as any).userMessage || fallback;
    }
  } else if (typeof error === 'object' && error !== null) {
    rawMessage = (error as any).message || '';
    statusCode = (error as any).statusCode;
    if (Array.isArray((error as any).errors)) {
      validationErrors = (error as any).errors;
    }
    if (typeof (error as any).userMessage === 'string' && (error as any).userMessage) {
      return (error as any).userMessage;
    }
  } else if (typeof error === 'string') {
    rawMessage = error;
  }

  const normalized = rawMessage.toLowerCase();

  // ── Bước 1: Lỗi network / kết nối ───────────────────────────────────────
  const isNetworkError =
    normalized.includes('network error') ||
    normalized.includes('failed to fetch') ||
    normalized.includes('unable to connect') ||
    normalized.includes('econnrefused') ||
    normalized.includes('econnreset') ||
    normalized.includes('socket hang up') ||
    // Không có response nào cả (statusCode undefined + rawMessage kiểu kỹ thuật)
    (!statusCode && isTechnicalMessage(normalized));

  if (isNetworkError) {
    return 'Có lỗi xảy ra, vui lòng thử lại sau.';
  }

  // ── Bước 2: Timeout ──────────────────────────────────────────────────────
  const isTimeoutError =
    normalized.includes('timeout') ||
    normalized.includes('etimedout') ||
    normalized.includes('exceeded') ||
    statusCode === 408;

  if (isTimeoutError) {
    return 'Yêu cầu mất quá nhiều thời gian. Vui lòng thử lại.';
  }

  // ── Bước 3: 5xx / lỗi hệ thống ──────────────────────────────────────────
  if (statusCode && statusCode >= 500) {
    return 'Hệ thống đang gặp sự cố. Vui lòng thử lại sau ít phút.';
  }

  // ── Bước 4: 4xx — ưu tiên validation message từ BE ──────────────────────
  // Thử lấy validation message cụ thể từ mảng errors
  if (validationErrors.length > 0) {
    const firstErr = validationErrors[0];
    if (firstErr && typeof firstErr === 'object') {
      const errMsg =
        (firstErr as any).error ||
        (firstErr as any).message ||
        (firstErr as any).msg ||
        '';
      if (typeof errMsg === 'string' && isSafeUserMessage(errMsg)) {
        return errMsg;
      }
    }
  }

  // ── Bước 5: Xử lý theo status code 4xx ──────────────────────────────────
  if (statusCode === 401) return 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
  if (statusCode === 403) return 'Bạn không có quyền thực hiện thao tác này.';
  if (statusCode === 404) return 'Không tìm thấy dữ liệu yêu cầu.';

  // ── Bước 6: 400/409/422 — hiển thị message từ BE nếu an toàn ─────────────
  if (statusCode && statusCode >= 400 && statusCode < 500) {
    if (rawMessage && isSafeUserMessage(rawMessage)) {
      return rawMessage;
    }
    // Fallback chung cho 4xx
    return fallback;
  }

  // ── Bước 7: Không có statusCode — kiểm tra rawMessage ───────────────────
  if (rawMessage && isSafeUserMessage(rawMessage)) {
    return rawMessage;
  }

  return fallback;
}

/** Kiểm tra xem normalized message có phải là chuỗi kỹ thuật không */
function isTechnicalMessage(normalized: string): boolean {
  const technicalKeywords = [
    'is not a function',
    'cannot read',
    'undefined',
    'axioserror',
    'request failed',
    'status code',
    'internal server error',
    'econnrefused',
    'socket',
    'exception',
  ];
  return technicalKeywords.some((kw) => normalized.includes(kw));
}
