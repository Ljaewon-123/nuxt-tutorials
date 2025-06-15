import type { H3Error } from 'h3';

interface ParsedError {
  statusCode: number;
  error: boolean;
  statusMessage: string;
  message: string;
  url: string;
}

// 신뢰성 보장이 없다면 destr ??
export function parseErrorData(error?: H3Error): ParsedError | undefined {
  if(!error) return undefined
  const parseError = (error.data as ParsedError)
  
  const stateCode = error.statusCode ?? 500;
  const statusMessage = error.statusMessage ?? 'Server Error'
  const message = parseError.message ?? 'Unknown error';
  const url = parseError.url ?? '';

  return {
    statusCode: stateCode,
    error: parseError.error,
    statusMessage,
    message,
    url,
  };
}
