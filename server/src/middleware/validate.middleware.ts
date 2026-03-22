import { NextFunction , Response , Request } from "express";
import { ZodError, ZodTypeAny } from "zod";

const validate = (schema : ZodTypeAny) => {
    return (req:Request,res:Response,next:NextFunction) => {
        try{
            schema.parse(req.body);
            next();
        }catch(error){
            if(error instanceof ZodError){
                return res.status(400).json({message : error.issues[0].message});
            }
            return res.status(500).json({message : "Internal server error"});
        }
    }
}

export default validate ;