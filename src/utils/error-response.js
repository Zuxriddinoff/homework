export const errorResponse = (res, statuscode, err) => {
  return res
    .status(statuscode || 500)
    .json({
      statusCode: statuscode,
      message: err || "Internal server error",
      errorType: err.message || "Unknown errorType",
    });
};
