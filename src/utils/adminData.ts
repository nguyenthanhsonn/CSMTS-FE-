type ListResponse<T> =
  | T[]
  | {
      data?: T[] | { items?: T[] };
      items?: T[];
    }
  | null
  | undefined;

const TECHNICAL_ERROR_PATTERNS = [
  'is not a function',
  'cannot read',
  'undefined',
  'null',
  'network error',
  'request failed with status code 500',
  'internal server error',
];

export function toArray<T>(response: ListResponse<T>): T[] {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.items)) {
    return response.items;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (response?.data && !Array.isArray(response.data) && Array.isArray(response.data.items)) {
    return response.data.items;
  }

  return [];
}

export function getUserFriendlyError(error: unknown, fallbackMessage: string) {
  const message = error instanceof Error ? error.message : '';
  const statusCode = typeof error === 'object' && error !== null && 'statusCode' in error ? Number(error.statusCode) : undefined;
  const errors = typeof error === 'object' && error !== null && 'errors' in error ? error.errors : undefined;
  const firstValidationError = Array.isArray(errors) ? errors[0] : null;
  const validationMessage =
    firstValidationError &&
    typeof firstValidationError === 'object' &&
    'error' in firstValidationError &&
    typeof firstValidationError.error === 'string'
      ? firstValidationError.error
      : '';
  const normalizedMessage = message.toLowerCase();
  const isTechnicalMessage = TECHNICAL_ERROR_PATTERNS.some((pattern) => normalizedMessage.includes(pattern));

  if (validationMessage) {
    return validationMessage;
  }

  if (!message || isTechnicalMessage || (statusCode && statusCode >= 500)) {
    return fallbackMessage;
  }

  return message;
}
