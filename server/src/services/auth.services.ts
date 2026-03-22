import env from "../config/env";
import { User as UserType } from "../middleware/auth.middleware";
import User, { IUser } from "../models/user.modal";
import { ApiError } from "../utils/apiError";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (payload : {email : string, password : string}):Promise<IUser> => {
    const {email,password} = payload;

    const isExist = await User.findOne({email}).lean();
    if(isExist)throw new ApiError(409,"User already exists");

    const hashedPassword = await bcrypt.hash(password , Number(env.SALT));

    const user = await User.create({
        email,
        password : hashedPassword
    });
    
    return user;
}

export const login = async (payload : {email : string, password : string}):Promise<IUser> => {

    const {email,password} = payload;

    const user = await User.findOne({email}).lean();
    if(!user){
        throw new ApiError(404,"User not found");
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        throw new ApiError(403,"Invalid password");
    }

    return user;
}

export const checkToken = async (token:string) => {
    if(!token?.trim())throw new ApiError(400,"token not found!");

    const decoded = jwt.verify(token,env.JWT_SECRET) as UserType
    if(!decoded)throw new ApiError(403,"Invalid token!");

    const user = await User.findOne({_id : decoded._id,refreshToken : token}).lean();
    if(!user)throw new ApiError(404,"User not found!");

    return user;
}

export const logout = async (id:string) => {
    const user = await User.findByIdAndUpdate(id,{$set : {refreshToken : ""}});
    if(!user)throw new ApiError(404,"User not found!");
}

export const checkAuth = async (id:string) => {
    const user = await User.findById(id)
    .populate("chats")
    .select("_id email chats")
    .lean();
    if(!user)throw new ApiError(404,"User not found!");
    return user ;
}