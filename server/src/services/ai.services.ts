import env from "../config/env"
import Chat from "../models/chats.modal"
import { ApiError } from "../utils/apiError"
import axios from 'axios'

const callModel = async (model:string, messages:any[]) => {

    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions",
        {
            model,
            messages
        },
        {
            headers:{
                "Authorization":`Bearer ${env.OPEN_ROUTER_KEY}`,
                "Content-Type":"application/json"
            }
        }
    )
    return response.data.choices[0].message.content;
}

export const askAiService = async (question:string,userId:string) => {

    if(!question?.trim())throw new ApiError(400,"Question is required");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const messages = await Chat.find({userId, createdAt:{$gte:today}}).sort({createdAt:-1}).limit(10);

    const formattedMessages = messages.map(msg => {
        return {
            role: "user",
            content: msg.question
        }
    });

    formattedMessages.push({
        role: "user",
        content: question
    });

    try{
        return await callModel("meta-llama/llama-3-8b-instruct",formattedMessages);
    }catch(error){
        console.log("model switching..",error);
        return await callModel("openai/gpt-3.5-turbo",formattedMessages);
    }
}

export const saveAiService = async (data:{question:string,response:string},userId:string) => {
    
    if(!data.question?.trim() || !data.response?.trim())throw new ApiError(400,"Question and response are required");

    const chat = await Chat.create({
        question:data.question,
        response:data.response,
        userId
    });

    return chat;
}
