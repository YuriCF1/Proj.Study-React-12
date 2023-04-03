// import React from "react";
import "./EditProfile.css";

//Images
import { uploads } from "../../utils/config";

//Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//Redux
import { profile, resetMessage } from "../../slices/userSlice";

//Components
import Message from "../../components/Message";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user, message, error, loading } = useSelector((state) => state.user);

  //States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  console.log(user);

  //Load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  //Fill form with user data
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  //Functions
  const handleSubmit = (e) => {
    // e.preventDefault();
  };

  const handleFile = (e) => {
    //Image preview
    const image = e.target.files[0];
    // console.log(e.target.files[0]);
    setPreviewImage(image);

    //Update image state
    setProfileImage(image);
  };

  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">
        Adicionar uma imagem de perfil, e conte mais sobre você...
      </p>
      {(user.profileImage || previewImage) && (
        <img className="profile-image"
          src={
            previewImage
              ? URL.createObjectURL(previewImage) //Criando URL temporária
              : `${uploads}/users/${user.profileImage}`
          }
          alt={user.name}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input type="Email" placeholder="Email" disabled value={email || ""} />
        <label>
          <span>Imagem do perfil</span>
          <input type="file" onChange={handleFile} />
        </label>
        <label>
          <span>Bio:</span>
          <input
            type="text"
            placeholder="Descrições do perfil"
            onChange={(e) => setBio(e.target.value)}
            value={bio || ""}
          />
        </label>
        <label>
          <span>Quer alterar a senha?</span>
          <input
            type="password"
            placeholder="Digite sua nova senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </label>
        <input type="submit" value="Atualizar" />
      </form>
    </div>
  );
};

export default EditProfile;
