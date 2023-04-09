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

//Hooks
import { useEffect, useRef, useState } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";

//Redux

import { getUserDetails } from "../../slices/userSlice";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  //Another profile
  const { user, loading } = useSelector((state) => state.user);

  //User itself
  const { user: userAuth } = useSelector((state) => state.auth);

  //New Form and edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef;

  //Loading user data
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  const submitHandle = (e) => {
    e.preventDefault();
  };

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
                <input type="text" placeholder="Insira um título" />
              </label>
              <label>
                <span>Imagem:</span>
                <input type="file" placeholder="Insira um título" />
              </label>
              <input type="submit" value="Postar"/>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
