import QRCode from "qrcode";
import { promises as fsPromises, stat } from "fs";
import { fileURLToPath } from "url";
import { resolve, dirname } from "path";
import { whatsapp } from "../applications/whatsapp.js";
import { ResponseError } from "../utils/ResponseError.js";
import { messagesSchema } from "../validators/messages.validation.js";
import { validate } from "../validators/validation.js";
import { logger } from "../applications/logging.js";

const messages = async (request) => {

	const messages = validate(messagesSchema, request)

	const id = `${messages.id}@s.whatsapp.net`;

	if (whatsapp.sock != null) {
		if (whatsapp.status == 3) {
			whatsapp.sock.sendMessage(id, {
				text: messages.message,
			});
		} else {
			throw new ResponseError(500, "Whatsapp service not ready, please scan qrcode first.")
		}
	} else {
		throw new ResponseError(500, "Whatsapp service unavailable")
	}
}

const link = async () => {
	let isQr = whatsapp.qr ? true : false;
	if (isQr) {
		return {
			connected: false,
			qrcode: `/api/link/qrcode`
		};
	} else {
		return {
            connected: true,
            qrcode: `/api/link/qrcode`,
        };
	}
}

const qrcode = async () => {
    let isQr = whatsapp.qr ? true : false;
    if (isQr) {
        let url = await QRCode.toDataURL(whatsapp.qr);
        return (
            '<head> <meta http-equiv="refresh" content="3"> </head><img src="' +
            url +
            '" width="30%">'
        );
    } else if (whatsapp.status == 2) {
        return '<head> <meta http-equiv="refresh" content="3"> </head>Connecting';
    }
};

const unlink = async () => {
	try {

		const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

		const directoryPath = resolve(__dirname, '../../auth_info_baileys');

		try {
            await fsPromises.rmdir(directoryPath, { recursive: true });
			whatsapp.connect()
		} catch (e) {
            throw new ResponseError(`Directory "${directoryPath}" has been deleted.`);
		}
	} catch (e) {
		throw new ResponseError(500, e.message)
	}
}

export default { messages, link, qrcode, unlink }