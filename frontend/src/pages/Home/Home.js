//CSS
import "./Home.css";

//Hooks react
import React, { useEffect } from "react";

//Components
import LikeContainer from "../../components/LikeContainer";
import photoItem from "../../components/PhotoItem";

//React Router
import { Link } from "react-router-dom";

//Custom hook
import {useResetComponentMessage} from "../../hooks/useResetComponentMessage";

//Hooks redux
import { useSelector, useDispatch } from "react-redux";

// Redux
import { getAllPhotos, likeAPhoto, LikeAPhoto } from "../../slices/photoSlice";

const Home = () => {
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage();
  const { user } = useSelector((state) => state.auth);

  const { photos, loading } = useSelector((state) => state.photos);

  console.log(photos);
  
  //Load all photos
  useEffect(() => {
    dispatch(getAllPhotos());
  }, [dispatch]);

  //Lika a photo
  const handleLike = (photo) => {
    dispatch(likeAPhoto(photo._id));

    resetMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
