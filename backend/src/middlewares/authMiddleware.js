import jwt from 'jsonwebtoken';
export const authMiddleware = async (req, res, next) => {
    try {
        const cookies =req.cookies;
        const token =cookies['jwt'];
        if(!token) {
            return res.status(403).json({
                message: "Token is invalid"
            });
        }
        try{
            const decode = await jwt.decode(token);
            req.user = decode;
            console.log("printing the value of deocde ->",decode);
            console.log(decode);
        }
        catch(err){
            return res.status(403).json({
                message: "Token is invalid"
            });
        }   

        next();
    } catch (err) {
        return res.status(500).send(err.message);
    }
};