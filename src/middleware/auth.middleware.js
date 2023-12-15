import dotenv from "dotenv";
import { logger } from "../applications/logging.js";
import { ResponseError } from "../utils/ResponseError.js";

dotenv.config()

export const verifyAPIKey = (req, res, next) => {
    const token = req.headers["x-api-key"];
    if (token && token === process.env.API_KEY) {
        next();
    } else {
        logger.info(process.env.API_KEY);
        throw new ResponseError(401, "Unauthorized");
    }
};
