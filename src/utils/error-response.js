export const catchError = (res, code, err) => {
    console.log(err);
    
    return res.status(code).json({
        statusCode: code,
        error: err,
        stack: err.stack
    });
};