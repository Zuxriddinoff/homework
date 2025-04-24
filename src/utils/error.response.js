export const catchError = (res, code, err) => {
    return res.status(500).json({
        statuscode:code,
        error: err.message
    }
)}