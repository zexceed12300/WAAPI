import { logger } from "../applications/logging.js";
import { ResponseError } from "../utils/ResponseError.js";

const validate = (schema, request) => {
	const result = schema.validate(request, {
		abortEarly: false,
		allowUnknown: false
	});
	if (result.error) {
		throw new ResponseError(400, result.error.message);
	} else {
		return result.value;
	}
}

export {
	validate
}