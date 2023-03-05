const yup = require('yup');

const onlyChar = /^[aA-zZ\s]+$/

const artistValidator = yup.object({
    firstname: yup.string().matches(onlyChar).max(100).required(),
    lastname: yup.string().matches(onlyChar).max(50),
    birthdate: yup.date().nullable(),
    deathdate: yup.date().nullable().min(yup.ref('birthdate'))
})

module.exports = artistValidator;