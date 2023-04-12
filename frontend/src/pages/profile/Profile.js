// import React from 'react'

//Css
import Porfile from "./Profile.css";

//Icons
import { BsFillEyesFill, BsPencilFill, BsXLg } from "react-icons/bs";

//Files
import { uploads } from "../../utils/config";

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
import { publishPhoto, resetMessage } from "../../slices/photoSlice";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  //Another profile
  const { user, loading } = useSelector((state) => state.user);

  //User itself
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);

  const [ title, setTitle ] = useState("");
  const [ image, setImage ] = useState("");

  //New Form and edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef;

  //Loading user data
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

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
    
    setTimeout(() => {
      dispatch(resetMessage);
    }, 2000);
    
  };

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
              {!loading && <input type="submit" value="Postar" />}
              {loading && <input type="submit" disabled value="Aguarde..." />}
              {errorPhoto && <Message msg={errorPhoto} type="error" />}
              {messagePhoto && <Message msg={messagePhoto} type="sucess" />}
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
