enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

const isDevelopment = __DEV__;

const logger = {
  debug: (message: string, data?: unknown): void => {
    if (isDevelopment) {
      console.log(`[${LogLevel.DEBUG}] ${message}`, data);
    }
  },
  info: (message: string, data?: unknown): void => {
    console.log(`[${LogLevel.INFO}] ${message}`, data);
  },
  warn: (message: string, data?: unknown): void => {
    console.warn(`[${LogLevel.WARN}] ${message}`, data);
  },
  error: (message: string, error?: unknown): void => {
    console.error(`[${LogLevel.ERROR}] ${message}`, error);
  },
};

export default logger;
