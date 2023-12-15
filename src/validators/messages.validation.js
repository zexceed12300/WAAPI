import Joi from "joi";

const messagesSchema = Joi.object({
    id: Joi.string().max(16).required(),
    message: Joi.string().required()
});

export {
	messagesSchema
}
