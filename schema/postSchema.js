const joi = require("joi");

module.exports = {
    addPostSchema: joi.object({
        caption: joi.string().min(4).required(),
        description: joi.string().min(10).required(),
        image: joi.array()
    }).required(),
    updatePostSchema: joi.object({
        caption: joi.string().min(4).required().optional(),
        description: joi.string().min(10).required().optional(),
        image: joi.array().optional()
    }).required(),
}


