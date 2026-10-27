/**
 * 404 Route Not Found Middleware (BEE-II Core Concept)
 */
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Resource not found: ${req.method} ${req.originalUrl}`,
      statusCode: 404,
    },
  });
};

export default notFoundHandler;
