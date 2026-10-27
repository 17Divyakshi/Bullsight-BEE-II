/**
 * Request Validation Middleware (BEE-II Core Concept)
 * Validates request payload properties against required schemas.
 */

export const validateBody = (requiredFields = []) => {
  return (req, res, next) => {
    const missing = [];
    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
        missing.push(field);
      }
    }

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: {
          message: `Validation error: Missing required field(s): ${missing.join(', ')}`,
          statusCode: 400,
          missingFields: missing,
        },
      });
    }

    next();
  };
};

export const validateNumeric = (fields = []) => {
  return (req, res, next) => {
    const invalid = [];
    for (const field of fields) {
      const val = req.body[field];
      if (val !== undefined && (typeof val !== 'number' || isNaN(val) || val < 0)) {
        invalid.push(field);
      }
    }

    if (invalid.length > 0) {
      return res.status(400).json({
        success: false,
        error: {
          message: `Validation error: Field(s) must be non-negative numbers: ${invalid.join(', ')}`,
          statusCode: 400,
        },
      });
    }

    next();
  };
};

export default { validateBody, validateNumeric };
