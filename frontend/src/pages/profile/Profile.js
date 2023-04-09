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

  //Photo

  //Loading user data
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

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
      </div>
    </div>
  );
};

export default Profile;
