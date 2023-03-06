const { body } = require("express-validation");

const photoInserValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O título é obrigatório")
      .isString()
      .withMessage("O título é obrigatório")
      .isLenght({ min: 3 })
      .withMessage(" O título precisa ter no mínimo 3 caracteres"),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("A imagem é obrigatória");
      }

      return true;
    }),
  ];
};

module.exports = {
    photoInserValidation,

}