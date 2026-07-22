import { getUserFriendlyError as getFriendlyError } from './errorHelper';

type ListResponse<T> =
  | T[]
  | {
      data?: T[] | { items?: T[] };
      items?: T[];
    }
  | null
  | undefined;

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
  return getFriendlyError(error, fallbackMessage);
}
