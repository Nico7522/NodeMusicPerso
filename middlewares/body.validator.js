const { ObjectSchema } = require("yup");
const { ErrorResponse } = require("../utils/error.response");
/**
 *
 * @param { ObjectSchema } yupValidator
 */
const bodyValidation = (yupValidator) => {
  return async (req, res, next) => {
    try {
      const valideData = await yupValidator.noUnknown().validate(req.body, { abortEarly: false })
      req.body = valideData;
      next();
    } catch (error) {
      console.log(error);
      return res.status(400).json(new ErrorResponse(error.errors));
    }
  };
};

module.exports = bodyValidation;
