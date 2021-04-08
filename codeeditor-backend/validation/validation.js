const Joi = require('@hapi/joi');

//registerValidation
const registerValidation = (data) =>{
    const schema=Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()             
    });

    return schema.validate(data);
}

//loginValidation
const loginValidation = (data) =>{
    const schema=Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()            
    });
    return schema.validate(data);
}

//editorValidation
const editorValidation = (data) =>{
    const schema=Joi.object({
        title: Joi.string().required(),
    }).unknown();
    return schema.validate(data);
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.editorValidation = editorValidation;