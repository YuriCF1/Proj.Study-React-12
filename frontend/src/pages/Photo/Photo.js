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
  commentingAPhoto,
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

  //Coments
  const [commentText, setComentText] = useState("");

  const handleComent = (e) => {
    e.preventDefault();

    const comentData = {
      comment: commentText,
      id: photo._id,
    };

    dispatch(commentingAPhoto(comentData));

    setComentText("");

    resetMessage();
    console.log("Enviado");
  };

  //Load photo data
  useEffect(() => {
    dispatch(getPhotoById(id));
    dispatch(resetMessage());
  }, [dispatch, id]);

  console.log(photo);

  //Inserting a like
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
        {/* Coments area */}
        {photo.comments && (
          <div className="comments">
            <h3>Comentários:({photo.comments.length})</h3>
            <form onSubmit={handleComent}>
              <input
                type="text"
                placeholder="Insira seu comentário"
                onChange={(e) => setComentText(e.target.value)}
                value={commentText || ""}
              />
              <input type="submit" value="Enviar" />
            </form>
            {photo.comments.length === 0 && <p>Não há comentários ainda</p>}
            {photo.comments.map((comment) => (
              <div className="coment" key={comment.comment}>
                {/* Su eu precisar de id verdadeiramente únicos, utilizar a biblioteca uuid */}
                <div className="author">
                  {comment.userImage && (
                    <img
                      src={`${uploads}/users/${comment.userImage}`}
                      alt={comment.userNam}
                    />
                  )}

                  <Link to={`/users/${comment.userId}`}>
                    <p>{comment.userName}</p>
                  </Link>
                </div>
                <p className="coment">{comment.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Photo;
