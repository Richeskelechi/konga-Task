import express from 'express';
import UserController from '../controllers/UserController';
import { authenticate, authorizeAdmin } from '../middlewares/auth';

const router = express.Router();

router.post('/', UserController.createUser);
router.post('/login', UserController.loginUser);
router.get('/', authenticate, authorizeAdmin, UserController.getAllUsers);
router.get('/:userId', UserController.getUserById);
router.put('/:userId', authenticate, UserController.updateUser);
router.delete('/:userId', authenticate, authorizeAdmin, UserController.deleteUser);

export default router;
