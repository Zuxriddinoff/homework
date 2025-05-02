export const successRes = (res, code, resData) => {
    return res.status(200).json({
        statusCode: code,
        message: 'success',
        data: resData
    });
};