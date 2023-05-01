import "./Search.css";

//Hooks react
import { useEffect } from "react";

//Hooks react router
import { Link } from "react-router-dom";

//Hooks redux
import { useDispatch, useSelector } from "react-redux";

//Custom hooks
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import { useQuery } from "../../hooks/useQuery";

//Components
import LikeContainer from "../../components/LikeContainer";
import PhotoItem from "../../components/PhotoItem";

//Slice's Functions
import { searchPhotos, likeAPhoto } from "../../slices/photoSlice";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const dispatch = useDispatch();
  const resetMessageHook = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photos);

  console.log(photos);
  //Load photos
  useEffect(() => {
    dispatch(searchPhotos(search));
  }, [dispatch, search]);

  const handleLike = (photo) => {
    dispatch(likeAPhoto(photo._id));
    resetMessageHook();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="search">
      <h2>Resultados da busca por: <span>{search}</span></h2>
      {/* <h3>{photos[0]}</h3> */}
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
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Não foram encontrados resultados para sua busca
          {/* <Link to={`/users/${user._id}`}>
            Clique aqui para ser o primeiro!
          </Link> */}
        </h2>
      )}
    </div>
  );
};

export default Search;
