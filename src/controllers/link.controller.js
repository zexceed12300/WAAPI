import { logger } from "../applications/logging.js"
import whatsappService from "../services/whatsapp.service.js"

const link = async (req, res, next) => {
	try {
		const result = await whatsappService.link()
		res.status(200).json({
			status: true,
			message: "success",
			data: result
		})
	} catch(e) {
		next(e)
	}
}

const unlink = async (req, res, next) => {
	try {
		await whatsappService.unlink()
		res.status(200).json({
			status: true,
			message: "Unlink successfully"
		})
	} catch(e) {
		next(e)
	}
}

export default { link, unlink }