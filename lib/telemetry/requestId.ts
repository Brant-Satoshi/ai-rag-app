import 'next';

declare module 'next' {
  interface NextRequest {
    requestId?: string;
  }
}

export function getRequestId(): string {
  return crypto.randomUUID();
}
