export const printHelloWorld = (req, res) => {
    try{
       console.log("Hello, World! from printHelloWorld controller");
        res.status(200).json({
            message: "Successfully printed",
            data: {}
        });

    }catch(err){
        console.error("Error in printHelloWorld:", err.message);
        res.status(500).json({
            error: err.message,
        });

    }
}
export const doNothingController = (req, res) => {
    try{
        console.log("Doing nothing as requested");
        return res.status(200).send("Doing nothing as requested");
    }catch(err){
        console.error("Error in doNothingController:", err.message);
        return res.status(500).send("error is doing nothing" + err.message);
    }
}
export const getDataFromFrontend = (req, res) => {
    try{
        const params = req.params;
        const productId = req.params.productId;
        console.log("Data received from frontend:", data);
        return res.status(200).json({
            message: "Data received successfully",
            data
        });
    }catch(err){
        console.error("Error in getDataFromFrontend:", err.message);
            return res.status(500).json({
                error: err.message,
            });
        }
    }