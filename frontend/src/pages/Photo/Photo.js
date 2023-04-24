import React, { useEffect, useState } from "react";

import "./Photo.css";

import { uploads } from "../../utils/config";

//Components
import Message from "../../components/Message";
import PhotoItem from "../../components/PhotoItem";

//Hooks
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Redux
import { getPhotoById, likeAPhoto } from "../../slices/photoSlice";
import LikeContainer from "../../components/LikeContainer";

const Photo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  //Comentários

  //Load photo data
  useEffect(() => {
    dispatch(getPhotoById(id));
  }, [dispatch, id]);

  console.log(photo);
  const handleLike = () => {
    // alert("Y")
    dispatch(likeAPhoto(photo._id));
  };

  //Like a coment

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
    </div>
  );
};

export default Photo;
