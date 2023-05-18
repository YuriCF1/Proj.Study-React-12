//CSS
import "./Home.css";

//Hooks react
import React, { useEffect } from "react";

//Components
import LikeContainer from "../../components/LikeContainer";
import PhotoItem from "../../components/PhotoItem";

//React Router
import { Link, Navigate, useNavigate } from "react-router-dom";

//Custom hook
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

//Hooks redux
import { useSelector, useDispatch } from "react-redux";

// Redux
import {
  getAllPhotos,
  likeAPhoto,
  resetSliceState,
} from "../../slices/photoSlice";

import { useAuth } from "../../hooks/useAuth";

const Home = () => {
  const { auth } = useAuth();
  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);
  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photos);

  // console.log(photos);
  console.log("AUTH HOME: ", auth);

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
    <div id="home">
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo}></PhotoItem>
            <LikeContainer
              photo={photo}
              user={user}
              handleLike={handleLike}
            ></LikeContainer>
            <Link className="btn" to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
          </div>
        ))}

      {/* Caso não haja fotos */}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Ainda não há fotos publicadas.{" "}
          <Link to={`/users/${user._id}`}>
            Clique aqui para ser o primeiro!
          </Link>
        </h2>
      )}
    </div>
  );
};

export default Home;
