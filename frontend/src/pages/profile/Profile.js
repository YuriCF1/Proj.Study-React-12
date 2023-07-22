// import React from 'react'

//Css
import Porfile from "./Profile.css";

//Icons
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";
// import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

//Files
// import { uploads } from "../../utils/config";

//Components
import Message from "../../components/Message";

//React-dom
import { Link, useParams } from "react-router-dom";

//Hooks react
import { useEffect, useRef, useState } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";

//Functions Redux
import { getUserDetails } from "../../slices/userSlice";
import {
  publishPhoto,
  resetMessage,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
} from "../../slices/photoSlice";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  //Loading user data
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
    console.log(photos);
  }, [dispatch, id]);

  //Another profile
  const { user, loading } = useSelector((state) => state.user);

  //User itself
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photos);

  //Publis states
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  //Edit states
  const [editId, setEditId] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editTitle, setEditTitle] = useState("");

  //New Form and edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  const handleFile = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  const submitHandle = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    //Build form data
    const formData = new FormData();

    const photoFormData = Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );

    formData.append("photo", photoFormData);

    dispatch(publishPhoto(formData));

    setTitle("");
    resetComponentMessages();
  };

  // Delete photo
  const handleDelete = (id) => {
    dispatch(deletePhoto(id));
    resetComponentMessages();
  };

  //Reset function
  const resetComponentMessages = () => {
    setTimeout(() => {
      dispatch(resetMessage);
    }, 2000);
  };

  //Update a photo
  const handleUpdate = (e) => {
    e.preventDefault();

    const photoData = {
      title: editTitle,
      id: editId,
    };

    dispatch(updatePhoto(photoData));
    resetComponentMessages();
  };

  //Open edit form
  const handleEdit = (photo) => {
    if (editPhotoForm.current.classList.contains("hide")) {
      hideOrshowForm();
    }

    setEditTitle(photo.title);
    setEditId(photo._id);
    setEditImage(photo.image);
  };

  const handleCancelEdit = (e) => {
    hideOrshowForm();
  };

  //Show or hide form
  const hideOrshowForm = () => {
    newPhotoForm.current.classList.toggle("hide");
    editPhotoForm.current.classList.toggle("hide");
  };

  //Loading page
  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
        {/* Exemplode if else no JSX */}
        {/* {(() => {
          if (userAuth) {
            return <p>Sim</p>;
          } else {
            return <p>Não</p>;
          }
        })()} */}
      </div>
      {id === userAuth._id && (
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Compartilhe seu momento</h3>
            <form onSubmit={submitHandle}>
              <label>
                <span>Título da foto</span>
                <input
                  type="text"
                  placeholder="Insira um título"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ""}
                />
              </label>
              <label>
                <span>Imagem:</span>
                <input type="file" onChange={handleFile} />
              </label>
              {!loadingPhoto && <input type="submit" value="Postar" />}
              {loadingPhoto && (
                <input type="submit" disabled value="Aguarde..." />
              )}
              {errorPhoto && <Message msg={errorPhoto} type="error" />}
              {messagePhoto && <Message msg={messagePhoto} type="sucess" />}
            </form>
          </div>
          {/* FORMULÀRIO DE EDIÇÂO */}
          <div className="edit-photo hide" ref={editPhotoForm}>
            <p>Editando:</p>
            {editImage && (
              <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
            )}
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Insira o novo título"
                onChange={(e) => setEditTitle(e.target.value)}
                value={editTitle || ""}
              />
              <input type="submit" value="Atualizar" />
              <button className="cancel-btn" onClick={handleCancelEdit}>
                Cancelar edição
              </button>
            </form>
            {errorPhoto && <Message msg={errorPhoto} type="error" />}
            {messagePhoto && <Message msg={messagePhoto} type="sucess" />}
          </div>
        </>
      )}
      <div className="user-photos">
        <h2>Fotos publicadas</h2>
        <div className="photos-container">
          {user && photos &&
            photos.map((photo) => (
              <div className="photo" key={photo._id}>
                {photo.image && (
                  <img
                    src={`${uploads}/photos/${photo.image}`}
                    alt={photo.title}
                  />
                )} 
                {id === userAuth._id ? (
                  <div className="actions">
                    <Link className="btn" to={`/photos/${photo._id}`}>
                      <BsFillEyeFill />
                    </Link>
                    <BsPencilFill onClick={() => handleEdit(photo)} />
                    <BsXLg onClick={() => handleDelete(photo._id)} />{" "}
                    {/*Sem a arrow function, ele executa assim que aparece na tela*/}
                  </div>
                ) : (
                  <Link className="btn" to={`/photos/${photo._id}`}>
                    Ver
                  </Link>
                )}
              </div>
            ))}
          {photos.legth === 0 && <p>Ainda não há fotos publicadas</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
