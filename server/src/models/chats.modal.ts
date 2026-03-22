import { response } from "express";
import { Schema, model } from "mongoose";   

const ChatSchema = new Schema({
    response : {
        type : String,
        required : true,
    },
    question : {
        type : String,
        required : true,
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }

},{timestamps : true});

const Chat = model('Chat', ChatSchema);

export default Chat;