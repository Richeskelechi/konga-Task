import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from '../models/User';


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = <any>(jwt.verify(token, process.env.JWT_SECRET as string));

            const verifiedUser = await User.findByPk(decoded.id);

            if (!verifiedUser) {
                return res.status(403).json({
                    status: 400,
                    data: 'Not Authorized, Invalid User',
                    msg:"Failure"
                });
            }

            req.user = verifiedUser; // Store the entire user object in req.user for further use
            return next();
        } catch (error) {
            return res.status(404).json({
                status: 400,
                data: 'Unauthorized! To Access This.',
                msg:"Failure"
            });
        }
    } else {
        return res.status(404).json({
            status: 400,
            data: 'Unauthorized! To Access This.',
            msg:"Failure"
        });
    }
};

export const authorizeAdmin = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
        try {
            if (req.user.role !== "admin") {
                return res.status(403).json({
                    status: 400,
                    data: 'Not Authorized To Perform This Action',
                    msg:"Failure"
                });
            }

            return next();
        } catch (error) {
            return res.status(404).json({
                status: 400,
                data: 'Unauthorized! Admin',
                msg:"Failure"
            });
        }
    } else {
        return res.status(404).json({
            status: 400,
            data: 'Unauthorized! Admin',
            msg:"Failure"
        });
    }
};
