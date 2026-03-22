import { NextFunction , Request , Response } from "express";
import { askAiService , saveAiService } from "../services/ai.services";

export const handleAskAI = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {question} = req.body;

        const result = await askAiService(question,req.user?._id!);
        
        return res.status(200).json({success:true, message : "AI response", response : result});
    }catch(error){
        next(error);
    }
}

export const handleSave = async (req:Request, res:Response, next:NextFunction) => {
    try{

        const result = await saveAiService(req.body,req.user?._id!);
        
        return res.status(200).json({success:true, message : "AI response saved", chat : result});
    }catch(error){
        next(error);
    }
}