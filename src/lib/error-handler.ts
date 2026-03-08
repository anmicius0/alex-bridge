type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface ErrorConfig {
  logLevel?: LogLevel;
  shouldThrow?: boolean;
  context?: string;
}

export function logError(error: unknown, config: ErrorConfig = {}): void {
  const { logLevel = 'error', shouldThrow = false, context = '' } = config;

  const timestamp = new Date().toISOString();
  const errorInfo = formatError(error);

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

function formatError(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return `${error.name}: ${error.message}`;
  }

  if (error && typeof error === 'object') {
    try {
      return JSON.stringify(error);
    } catch {
      return String(error);
    }
  }

  return String(error);
}

export async function safeExecute<T>(
  operation: () => T | Promise<T>,
  config: ErrorConfig = {}
): Promise<{ success: boolean; data?: T; error?: unknown }> {
  try {
    const data = await operation();
    return { success: true, data };
  } catch (error) {
    logError(error, config);
    return { success: false, error };
  }
}
