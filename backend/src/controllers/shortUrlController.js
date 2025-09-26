import { ShortURL } from "../models/shorturl.model.js";
import { nanoid as nanoId } from "nanoid";
export const createShortUrl = async (req, res) => {
    try {
        let { originalUrl ,title,expiresAt,customUrl} = req.body;
        const userId = req.user.id;
        let newNanoId = nanoId(7);

        while(true){
            const existing = await ShortURL.findOne({ shortURL: newNanoId });
            if(!existing) break;
            newNanoId = nanoId(7);
        }
        if(customUrl){
            const existing = await ShortURL.findOne({ shortURL: customUrl });
            if(!existing){
                newNanoId = customUrl;
            }
        }
       
        const newShortCode = await ShortURL.create({
            originalUrl,
            shortCode: newNanoId,
            title,
            expiresAt:new Date(expiresAt),
            userId
        })
        res.status(200).json({
            message: "Short URL created successfully",
            data: newShortCode
        })

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Error in creating short URL"
        });
    }
}
export const redirectToOriginalUrl = async (req, res) => {
    try{
        const {shortCode} = req.params;

        const doc=await ShortURL.findOne({shortCode});
        if(!doc){
            return res.status(404).json({
                message:"Short URL not found"
            });
        }
        const originalUrl = doc.originalUrl;
        return res.redirect(originalUrl);

    }
    catch(err){
        console.error("Error in redirectToOriginalUrl:", err.message);
        return res.status(500).json({
            message: "Error in redirecting to original URL",
            error: err.message,
        });

    }
}

export const updateShortURLController = async (req, res) => {
    try{
        const { shortURL } = req.params;

        const updateData = req.body;

        const existed =await ShortURL.findOne({shortURL});
        if(!existed){
            return res.status(404).json({
                message:"Short URL not found",
                status:"Not Found",
            });
        }

    Objects.assign(existed, updateData);
    await existed.save();
    return res.status(200).json({
        data: "Record updated successfully",
        status:"SUCCESS",
    });

    }
    catch(err){
        console.error("Error in updateShortURLController:", err.message);
        return res.status(500).json({
            message: "Error in updating short URL",
            status:"Internal Server Error",
        });




}}

export const deleteShortURLController = async (req, res) => {
    try{
        const { shortURL } = req.params;

        const existed =await ShortURL.findOne({shortURL});
        if(!existed){
            return res.status(404).json({
                message:"Short URL not found",
                status:"Not Found",
            });
        }
        //soft delete
        existed.isActive = false;
        await existed.save();

        return res.status(200).json({
            data: "Record deleted successfully",
            status:"SUCCESS",
        });
    }
    catch(err){
        console.error("Error in deleteShortURLController:", err.message);
        return res.status(500).json({
            message: "Error in deleting short URL",
            status:"Internal Server Error",
        });

    }
}
    