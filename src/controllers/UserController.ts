import { Request, Response } from 'express';
import UserService from '../services/UserService';

const UserController = {
    createUser: async (req: Request, res: Response) => {
        try {
            const userData = req.body;
            const data = await UserService.createUser(userData);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(500).json({ error: error.message, status: error.statusCode, msg: "Failure" });
        }
    },

    loginUser: async (req: Request, res: Response) => {
        try {
            const userData = req.body;
            const data = await UserService.loginUser(userData);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(500).json({ error: error.message, status: error.statusCode, msg: "Failure" });
        }
    },

    getAllUsers: async (req: Request, res: Response) => {
        try {
            const data = await UserService.getAllUsers();
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(500).json({ error: error.message, status: error.statusCode, msg: "Failure" });
        }
    },

    getUserById: async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const user = await UserService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ data: 'User not found', statusCode: 404, msg: 'Failure' });
            }
            return res.status(200).json({ data: user, statusCode: 200, msg: 'Success' });
        } catch (error: any) {
            return res.status(500).json({ data: `Error: ${error.message}`, statusCode: 500, msg: 'Failure' });
        }
    },

    updateUser: async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const userData = req.body;
            const data = await UserService.updateUser(userId, userData);
            res.status(data.statusCode).json(data);
        } catch (error: any) {
            res.status(500).json({ error: error.message, status: error.statusCode, msg: "Failure" });
        }
    },

    deleteUser: async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const user = await UserService.deleteUser(userId);
            if (!user) {
                return res.status(404).json({ data: 'User not found', statusCode: 404, msg: 'Failure' });
            }
            return res.status(200).json({ data: "User Deleted Successfully", statusCode: 200, msg: 'Success' });
        } catch (error: any) {
            return res.status(500).json({ data: `Error: ${error.message}`, statusCode: 500, msg: 'Failure' });
        }
    },
};

export default UserController;
