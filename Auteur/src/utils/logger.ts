const logger = {
  debug: (message: string, data?: unknown): void => {
    console.log(`[DEBUG] ${message}`, data);
  },
  info: (message: string, data?: unknown): void => {
    console.log(`[INFO] ${message}`, data);
  },
  warn: (message: string, data?: unknown): void => {
    console.warn(`[WARN] ${message}`, data);
  },
  error: (message: string, error?: unknown): void => {
    console.error(`[ERROR] ${message}`, error);
  },
};

export default logger;
