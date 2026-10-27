/**
 * Express Request Logger Middleware (BEE-II Core Concept)
 * Logs HTTP method, URL, status code, and execution time in milliseconds.
 */
export const requestLogger = (req, res, next) => {
  const start = Date.now();
  const { method, originalUrl } = req;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    const statusColor = statusCode >= 500 ? '\x1b[31m' : statusCode >= 400 ? '\x1b[33m' : '\x1b[32m';
    console.log(
      `[HTTP] ${method} ${originalUrl} ${statusColor}${statusCode}\x1b[0m - ${duration}ms`
    );
  });

  next();
};

export default requestLogger;
