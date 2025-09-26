// src/routes/userRouter.js (or .ts)
import { Router } from 'express';
import { getProfileofUser } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getMyUrls } from '../controllers/userController.js';

const userRouter = Router();
userRouter.get('/me',authMiddleware,getProfileofUser);
userRouter.get('/my/url',authMiddleware,getMyUrls);


export default userRouter;