import express from 'express'
import { verifyAPIKey } from "../middleware/auth.middleware.js";
import messagesController from '../controllers/messages.controller.js'
import qrController from '../controllers/qrcode.controller.js';
import linkController from '../controllers/link.controller.js';

const api = new express.Router()
api.use(verifyAPIKey);
api.post("/api/messages", messagesController.messages);
api.get("/api/link", linkController.link);
api.delete("/api/link", linkController.unlink);
api.get("/api/qrcode", qrController.qrcode);

export { api };