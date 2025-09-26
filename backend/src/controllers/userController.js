import { User } from "../models/user/user.model.js";
import { ShortURL } from "../models/shorturl.model.js";
export const getProfileofUser =  async(req, res) => {
    try {
        const user = req.user; 
        const userId =user.id;
        const dbUser = await User.findOne({_id: userId});
        return res.status(200).json({
            message: "User profile",
            data:dbUser

        });
    } catch (err) {
        console.error("Error in getProfileofUser:", err.message);
        return res.status(500).json({
            message:"Erroe in getting user profile",
            error: err.message,
        });
    }  
};

export const getMyUrls = async (req, res) => {
    try {
        const user = req.user;
        const userId = user.id;

        // Pagination params
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalUrls = await ShortURL.countDocuments({ userId: userId });
        const userUrls = await ShortURL.find({ userId: userId })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const totalPages = Math.ceil(totalUrls / limit);

        return res.status(200).json({
            message: "User URLs fetched successfully",
            data: userUrls,
            pagination: {
                totalUrls,
                totalPages,
                currentPage: page,
                pageSize: limit,
            },
        });
    } catch (err) {
        console.error("Error in getMyUrls:", err.message);
        return res.status(500).json({
            message: "Error in fetching user URLs",
            error: err.message,
        });
    }
};
