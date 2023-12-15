import whatsappService from "../services/whatsapp.service.js";

const qrcode = async (req, res, next) => {
	try {
		const result = await whatsappService.qrcode();
		res.send(result)
	} catch(e) {
		next(e)
	}
}

export default { qrcode }