const yup = require("yup");

const createTrackValidator = yup.object({
  title: yup.string().max(100).trim().required(),
  duration: yup.number().integer().min(1).positive().required(),
  GenreId: yup.number().integer().positive().required(),
  albums: yup.array().of(yup.number().integer().positive()).required(),
  artists: yup
    .array()
    .of(
      yup
        .object({
          id: yup.number().integer().positive().required(),
          feat: yup.boolean(),
        })
        .required()
    )
    .required()
    .min(1),
});

const updateTrackValidator = yup.object({
  title: yup.string().max(100).trim().required(),
  duration: yup.number().integer().min(1).positive().required(),
})

module.exports = {createTrackValidator, updateTrackValidator};
