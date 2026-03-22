
import { Response , Request, NextFunction } from "express";
import { register , login , checkToken , logout } from "../services/auth.services";
import { accessToken, refreshToken } from "../utils/tokens";


export const handleRegister = async (req:Request, res:Response, next:NextFunction) => {
    try{

        const user = await register(req.body);

        const payload = {_id : user._id.toString(), email : user.email}
        accessToken(res, payload );
        await refreshToken(res, payload );

        return res.status(201).json({message : "User registered successfully"});

    }catch(error){
        next(error);
    }
}

export const handleLogin = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const user = await login(req.body);

        const payload = {_id : user._id.toString(), email : user.email}
        accessToken(res, payload );
        await refreshToken(res, payload );

        return res.status(200).json({message : "User logged in successfully"});
    }catch(error){
        next(error);
    }
}

export const handleRefresh = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const refresh = req.cookies.refresh_token ;
        const user = await checkToken(refresh);

        const payload = {_id : user._id.toString(), email : user.email}
        accessToken(res, payload );
        await refreshToken(res, payload );

        return res.status(200).json({message : "Token refreshed successfully"});

    }catch(error){
        next(error);
    }
}

export const handleLogout = async (req:Request, res:Response, next:NextFunction) => {
    try{
        await logout(req.user?._id || "");
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        return res.status(200).json({message : "User logged out successfully"});
    }catch(error){
        next(error);
    }
}