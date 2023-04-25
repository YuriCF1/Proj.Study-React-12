import React, { useEffect, useState } from "react";

import "./Photo.css";

import { uploads } from "../../utils/config";

//Components
import Message from "../../components/Message";
import PhotoItem from "../../components/PhotoItem";

//Hooks
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useResetCompomentMessage } from "../../hooks/useResetComponentMessage";

//Redux
import {
  getPhotoById,
  likeAPhoto,
  resetMessage,
} from "../../slices/photoSlice";

import LikeContainer from "../../components/LikeContainer";

const Photo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const resetMessageHook = useResetCompomentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  //Comentários

  //Load photo data
  useEffect(() => {
    dispatch(getPhotoById(id));
    dispatch(resetMessage());
  }, [dispatch, id]);

  console.log(photo);
  
  const handleLike = () => {
    dispatch(likeAPhoto(photo._id));
    resetMessageHook();
  };

  //Like a coment

  if (loading) {
    return <p>Carregando...</p>;
  }

  console.log(photo);
  console.log(message);

  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Message msg={message} type="error" />}
        {message && <Message msg={message} type="sucess" />}
      </div>
    </div>
  );
};

export default Photo;
