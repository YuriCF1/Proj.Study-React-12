//Fazendo autentificação
const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

//Generate user token
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d", //Fazendo logout automático depois de 7dias
  });
};

//Register user and sign in
const register = async (req, res) => {
  const { name, email, password } = req.body;

  //Check if user exists
  const user = await User.findOne({ email }); //findOne = método mangoose

  if (user) {
    res.status(422).json({ errors: ["O email utilizado já foi cadastrado"] });
    return;
  }

  //Generate password hash
  //Criptografando a senha
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  //Creating user
  const newUser = await User.create({ name, email, password: passwordHash }); //create = método mangoose

  //If user was created sucessfully, return the token
  if (!newUser) {
    res.status.json({ errors: ["Houve um erro, por favor, tente mais tarde"] });
  }

  res.status(200).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

//Sign user in
const login = (req,res) => { //3 - Função final quan do o login é validado
  res.send("Logado com sucesso")
}

module.exports = {
  register,
  login,
};
