const Joi = require('@hapi/joi');


const registerValidation = pData => {
    const schema = Joi.object({
        name: Joi
            .string()
            .min(6)
            .required(),
        email: Joi
            .string()
            .min(6)
            .email()
            .required(),
        password: Joi
            .string()
            .min(8)
            .required(),
    });
    return schema.validate(pData);
};

const loginValidation = pData => {
    const schema = Joi.object({
        email: Joi
            .string()
            .min(6)
            .email()
            .required(),
        password: Joi
            .string()
            .min(8)
            .required(),
    });
    return schema.validate(pData);
};

const createAuctionValidation = pData => {
    const schema = Joi.object({
        title: Joi
            .string()
            .min(6)
            .max(60)
            .required(),
        description: Joi
            .string()
            .required(),
        is_new: Joi
            .boolean()
            .required(),
        initial_value: Joi
            .string()
            .required(),
        initial_date: Joi
            .date()
            .iso()
            .required(),
        final_date: Joi
            .date()
            .iso()
            .greater(Joi.ref('initial_date'))
            .required(),
    });
    return schema.validate(pData);
};

const updateAuctionValidation = pData => {
    const schema = Joi.object({
        id: Joi
            .number()
            .required(),
        title: Joi
            .string()
            .min(6)
            .max(60)
            .required(),
        description: Joi
            .string()
            .required(),
        is_new: Joi
            .boolean()
            .required(),
        initial_value: Joi
            .string()
            .required(),
        initial_date: Joi
            .date()
            .iso()
            .required(),
        final_date: Joi
            .date()
            .iso()
            .greater(Joi.ref('initial_date'))
            .required(),
    });
    return schema.validate(pData);
};

const deleteAuctionValidation = pData => {
    const schema = Joi.object({
        id: Joi
            .number()
            .required()
    });
    return schema.validate(pData);
};

const bidValidation = pData => {
    const schema = Joi.object({
        auction_id: Joi
            .number()
            .required(),
        value: Joi
            .string()
            .required()
    });
    return schema.validate(pData);
};

const dataValuesValidation = pData => {
    const schema = Joi.object({
        start_time: Joi
            .date()
            .iso()
            .required(),
        current_time: Joi
            .date()
            .iso()
            .min(Joi.ref('start_time'))
            .required(),
        limit_time: Joi
            .date()
            .iso()
            .min(Joi.ref('current_time'))
            .required(),
        initial_value: Joi
            .number()
            .required(),
        winner_value: Joi
            .number()
            .required(),
        bid_value: Joi
            .number()
            .greater(Joi.ref('initial_value'))
            .greater(Joi.ref('winner_value'))
            .required(),
    });
    return schema.validate(pData);
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.createAuctionValidation = createAuctionValidation;
module.exports.updateAuctionValidation = updateAuctionValidation;
module.exports.deleteAuctionValidation = deleteAuctionValidation;
module.exports.bidValidation = bidValidation;
module.exports.dataValuesValidation = dataValuesValidation;
