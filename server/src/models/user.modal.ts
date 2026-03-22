import { Schema , Types, model } from "mongoose";

export type IUser = {
    _id : Types.ObjectId;
    email : string;
    password : string;
    chats : Types.ObjectId[];
    refreshToken : string
}

const UserSchema = new Schema<IUser>({
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    chats : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Chat'
        }
    ],
    refreshToken : String
})

const User = model<IUser>('User', UserSchema);

export default User;