import { web } from "./applications/web.js";
import { logger } from "./applications/logging.js";
import { whatsapp } from "./applications/whatsapp.js"

whatsapp.connect()

web.listen(3000, () => {
	logger.info("App start")
})