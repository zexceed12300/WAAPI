import { logger } from "../applications/logging.js";
import whatsappService from "../services/whatsapp.service.js";

const messages = async (req, res, next) => {
	try {
		await whatsappService.messages(req.body);
		res.status(200).json({
			status: true,
			message: "success"
		});
	} catch(e) {
		next(e);
	}
}

export default { messages }