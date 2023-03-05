const yup = require('yup');

const genreValidator = yup.object({
    name: yup.string().max(50).required().trim()
})

module.exports = genreValidator;