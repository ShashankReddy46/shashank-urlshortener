import { Router } from "express";
import { createShortUrl, updateShortURLController } from "../controllers/shortUrlController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { redirectToOriginalUrl } from "../controllers/shortUrlController.js";
import { deleteShortURLController } from "../controllers/shortUrlController.js";

const shortURLRouter = Router();
shortURLRouter.post("/",authMiddleware,createShortUrl);
shortURLRouter.patch("/:shortCode",authMiddleware,updateShortURLController);
shortURLRouter.delete("/:shortCode",authMiddleware,deleteShortURLController);
shortURLRouter.get("/:shortCode",redirectToOriginalUrl);

export default shortURLRouter;
