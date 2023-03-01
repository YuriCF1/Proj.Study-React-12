const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  //O token aparece assim: Bearer wh193h129d1829hd12, splitando pelo espaço, posso obter o segundo resultado (Sendo 'Bearer' o tipo de requisição HTTP)

  //Checking if header has a token
  if (!token) return res.status(401).json({ erros: ["Acesso negado"] });

  //Check if token is valid
  try {
    const verified = jwt.verify(token, jwtSecret);
    req.user = await User.findById(verified.id).select("-password"); //Removendo a senha da requisição

    next();
  } catch (error) {
    res.status(401).json({ erros: ["Token inválido"] });
  }
};

module.exports = authGuard;

//EXEMPLO DE CABEÇALHO DE UMA REQUISIÇÃO DESSAS
// POST /api/users HTTP/1.1
// Host: example.com
// Content-Type: application/json
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0
// Content-Length: 25

// {"name": "John Doe", "age": 30}