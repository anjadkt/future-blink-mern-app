import { NextFunction , Response , Request } from "express";
import jwt from 'jsonwebtoken'

export type User = {
    _id : string;
    email : string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if(!decoded){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = decoded as User;
    next();
}
    