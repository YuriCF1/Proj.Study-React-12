const express = require("express");
const router = express.Router();

//Controller
const {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentingPhoto,
  searchPhotos,
  dislikingPhoto,
} = require("../controllers/PhotoController");

//Middlewares
const {
  photoInsertValidation,
  photoUpdateValidation,
  comentsValidation,
} = require("../middlewares/photoValidation");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation"); //Valida se foi retornado erros, de acordo com od  middlewares antecessores
const { imageUpload } = require("../middlewares/imageUpload");

//Routes
router.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoInsertValidation(),
  validate,
  insertPhoto
);

router.delete("/:id", authGuard, deletePhoto);
router.get("/", authGuard, getAllPhotos);
router.get("/user/:id", authGuard, getUserPhotos); //"Cuidado com a ordem, pois talvez o express reconheça 'user' como id". Porém, mudei a rota e deu certo
router.get("/search", authGuard, searchPhotos);

router.get("/:id", authGuard, getPhotoById);
router.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhoto);
router.put("/like/:id", authGuard, likePhoto);
router.delete("/dislike/:id", authGuard, dislikingPhoto);
router.put(
  "/coment/:id",
  authGuard,
  comentsValidation(),
  validate,
  commentingPhoto
);

module.exports = router;
