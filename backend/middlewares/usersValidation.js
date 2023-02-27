const { body } = require("express-validator"); //Entrega tudo que vieo no corpo da rqeuisição

//validações mais complexas, deixa no controller
const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres"),
    body("email")
      .isString()
      .withMessage("Email é obrigatório")
      .isEmail()
      .withMessage("Insicra um email válido"),
    body("password")
      .isString()
      .withMessage("A senha é obrigatória")
      .isLength({ min: 5 })
      .withMessage("A senha precisa ter no mínimo 5 caracteres"),
    body("confirmPassword")
      .isString()
      .withMessage("A confirmação de senha é obrigatória")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("As senhas não são iguais");
        }
        return true;
      }),
  ];
};

module.exports = {
  userCreateValidation,
};
