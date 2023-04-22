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
import { getPhotoById } from "../../slices/photoSlice";

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

  //Like a coment

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="photo">
      <PhotoItem photo={photo}/>
    </div>
  );
};

export default Photo;
