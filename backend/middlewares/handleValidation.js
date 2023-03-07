//Servindo como validação geral, para não criar uma em todo arquivo
const { validationResult } = require("express-validator");

const validate = (req, res, next) => { // Validando se foi retornado erros
  //Como é um middleware, recebe também o 'next', quando queremos proseguir ou não pelo o q aconteceu na requisição
  const errors = validationResult(req); //Traz as mensagens de erros nas validações anteriores na rota definida

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];

  errors.array().map((err) =>
    extractedErrors.push(err.msg) //Todos os erro a serem identificados, estarão nesse array
  );

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = validate;

