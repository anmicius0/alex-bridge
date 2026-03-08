export interface AppError extends Error {
  status?: number;
  context?: string;
  timestamp?: Date;
}

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface ErrorConfig {
  logLevel?: LogLevel;
  shouldThrow?: boolean;
  context?: string;
}

export class ErrorHandler {
  static logError(error: unknown, context?: string): void {
    const appError = this.normalizeError(error, context);

    const timestamp = appError.timestamp?.toISOString() ?? new Date().toISOString();
    const level = appError.status && appError.status >= 500 ? 'error' : 'warn';

    const structuredLog = {
      message: appError.message,
      stack: appError.stack,
      context: appError.context,
      timestamp,
      status: appError.status,
    };

    switch (level) {
      case 'error':
        console.error(JSON.stringify(structuredLog));
        break;
      case 'warn':
        console.warn(JSON.stringify(structuredLog));
        break;
      default:
        console.error(JSON.stringify(structuredLog));
    }
  }

  static normalizeError(error: unknown, context?: string): AppError {
    if (error instanceof Error) {
      const appError = error as AppError;
      appError.context ??= context;
      appError.timestamp ??= new Date();
      return appError;
    }

    const err = new Error(String(error)) as AppError;
    err.name = 'UnknownError';
    err.context = context;
    err.timestamp = new Date();
    return err;
  }

  static createError(message: string, status?: number, context?: string): AppError {
    const error = new Error(message) as AppError;
    error.status = status;
    error.context = context;
    error.timestamp = new Date();
    return error;
  }

  static async safeExecute<T>(
    operation: () => T | Promise<T>,
    config: { context?: string; shouldThrow?: boolean } = {}
  ): Promise<{ success: boolean; data?: T; error?: AppError }> {
    try {
      const data = await operation();
      return { success: true, data };
    } catch (error) {
      const appError = this.normalizeError(error, config.context);
      this.logError(appError, config.context);
      if (config.shouldThrow) throw appError;
      return { success: false, error: appError };
    }
  }
}

/** @deprecated Use ErrorHandler.logError instead */
export function logError(error: unknown, config: ErrorConfig = {}): void {
  const { logLevel = 'error', shouldThrow = false, context = '' } = config;

  const appError = ErrorHandler.normalizeError(error, context || undefined);

  const timestamp = new Date().toISOString();
  const errorInfo = appError.stack
    ? `${appError.name}: ${appError.message}`
    : String(error);

  let message = `[${timestamp}] [${logLevel.toUpperCase()}]`;
  if (context) {
    message += ` [${context}]`;
  }
  message += ` ${errorInfo}`;

  switch (logLevel) {
    case 'debug':
      console.debug(message);
      break;
    case 'info':
      console.info(message);
      break;
    case 'warn':
      console.warn(message);
      break;
    case 'error':
    default:
      console.error(message);
      break;
  }

  if (shouldThrow && error instanceof Error) {
    throw error;
  }
}

/** @deprecated Use ErrorHandler.safeExecute instead */
export async function safeExecute<T>(
  operation: () => T | Promise<T>,
  config: ErrorConfig = {}
): Promise<{ success: boolean; data?: T; error?: unknown }> {
  const result = await ErrorHandler.safeExecute(operation, {
    context: config.context,
    shouldThrow: config.shouldThrow,
  });
  return { success: result.success, data: result.data, error: result.error };
}
