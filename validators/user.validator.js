const yup = require('yup')

const updateValidator = yup.object({

    firstname: yup.string().required().trim(),
    lastname: yup.string().required().trim(),
})

module.exports = updateValidator;