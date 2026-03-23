
import jwt from 'jsonwebtoken';
import env from '../config/env';
import type { User as UserType } from '../middleware/auth.middleware';
import { Response } from 'express'
import User from '../models/user.modal';

type CookieOptions = {
    httpOnly : boolean;
    secure : boolean;
    sameSite : 'strict' | 'lax' | 'none';
    maxAge : number;
    partitioned : boolean
}
 
const ACCESS_OPTIONS : CookieOptions = {
    httpOnly : true,
    secure : env.NODE_ENV === 'production',
    sameSite : 'none',
    maxAge : 15 * 60 * 1000,
    partitioned : true
}

const REFRESH_OPTIONS : CookieOptions = {
    httpOnly : true,
    secure : env.NODE_ENV === 'production',
    sameSite : 'none',
    maxAge : 7 * 24 * 60 * 60 * 1000,
    partitioned : true
}

export const accessToken = (
    res:Response,
    payload : UserType
) => {
    const token = jwt.sign(payload,env.JWT_SECRET,{expiresIn : '15m'});
    res.cookie('access_token',token,ACCESS_OPTIONS);
}

export const refreshToken = async (
    res:Response,
    payload : UserType
) => {
    const token = jwt.sign(payload,env.JWT_SECRET,{expiresIn : '7d'});
    res.cookie('refresh_token',token,REFRESH_OPTIONS);

    await User.findByIdAndUpdate(payload._id, { refreshToken : token });
}
