import { Router } from 'express';
import { doNothingController, getDataFromFrontend, printHelloWorld } from '../controllers/hwController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js'; // Add this line

const hwRouter = Router();
hwRouter.get('/', doNothingController);
hwRouter.get('/print', authMiddleware, printHelloWorld);
hwRouter.post('/data', getDataFromFrontend);
hwRouter.get('/:productId', getDataFromFrontend);
export default hwRouter;