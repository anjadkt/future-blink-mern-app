import { NextFunction , Request , Response } from "express";

const hanldeError = async ( err:any , req:Request , res:Response ,next:NextFunction) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    err.message = err.message || 'Internal server error';
    
    res.status(err.statusCode).json({
        status : err.status,
        message : err.message
    });

}

export default hanldeError;