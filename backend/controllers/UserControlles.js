//Fazendo autentificação
const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const jwtSecret = process.env.JWT_SECRET;

//Generate user token
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d", //Fazendo logout automático depois de 7dias
    // expiresIn: "7d", //Fazendo logout automático depois de 7dias
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

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

//Sign user in
const login = async (req, res) => {
  //3 - Função final quan do o login é validado
  // res.send("Logado com sucesso")

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //Check if user exists
  if (!user) {
    res.status(404).json({ errors: ["Usuário não encontrado"] });
    return;
  }

  //Check if passwords matches
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Senha inválida"] });
    return;
  }

  //Return user with token

  res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};

//Get current logged in user
const getCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(200).json(user);
};

//Update an user
const update = async (req, res) => {
  const { name, password, bio } = req.body;

  let profileImage = null; //Depois será preenchida

  if (req.file) {
    profileImage = req.file.filename;
  }

  const reqUser = req.user;

  //Não é necessário converter o id para ObjectId, pois o Id já foi definido como ObjectId no Schema
  const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select(
    "-password"
  ); //Pois o Id do MongoDb é uma string

  if (name) {
    user.name = name;
  }

  if (password) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    user.password = passwordHash;
  }

  if (profileImage) {
    user.profileImage = profileImage;
  }

  if (bio) {
    user.bio = bio;
  }

  await user.save();

  res.status(200).json(user);
};

//Get user by id
const getUserById = async (req, res) => {
  const { id } = req.params;

  //Check if user exists
  try {
    const user = await User.findById(mongoose.Types.ObjectId(id)).select(
      "-password"
    );

    if (!user) {
      res.status(404).json({ erros: ["Usuário não encontrado 2"] }); //Usuário com ID inexistente
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ errors: ["Usuário não encontrado"] }); //ID incoerente
    return;
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
};
