// import React from "react";
import "./EditProfile.css";

//Images
import { uploads } from "../../utils/config";

//Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//Redux
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";

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

  //Load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  console.log(user);

  //Fill form with user data
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  //Functions
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Get user data from state
    const userData = {
      //Começando com os obrigatórios
      name,
    };

    if (profile) {
      userData.profileImage = profileImage;
    }

    if (bio) {
      userData.bio = bio;
    }

    if (password) {
      user.password = password;
    }

    //Build form data
    const formData = new FormData();

    const userFormData = Object.keys(userData).forEach((key) =>
      formData.append(key, userData[key])
    ); //Fazendo um loop em todos as casas que serão enviada

    formData.append("user", userFormData);

    await dispatch(updateProfile(formData));
    console.log("FormData", formData);
    console.log("useFormData", userFormData);

    //Iterando sobre o formData
    for (const pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
  };

  setTimeout(() => {
    dispatch(resetMessage);
  }, 2000);

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
        <img
          className="profile-image"
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
        {!loading && <input type="submit" value="Atualizar" />}
        {loading && <input type="submit" disabled value="Aguarde..." />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="sucess" />}
      </form>
    </div>
  );
};

export default EditProfile;

/*A razão pela qual você precisa enviar dados em um objeto FormData em vez de JSON é porque o formato FormData é projetado para ser usado em um formulário HTML 
e enviado por meio de uma solicitação HTTP usando o método POST ou PUT. 
O FormData é uma maneira conveniente de enviar dados, pois ele permite enviar não apenas os valores dos campos de formulário, mas também arquivos, 
que não podem ser enviados em formato JSON.

O FormData também é útil porque pode lidar com o codificação de caracteres especiais nos dados, como espaços em branco e caracteres acentuados. 
Além disso, o formato FormData suporta o envio de dados como um fluxo (stream), o que é útil quando você está lidando com grandes arquivos.

Ao enviar dados usando FormData, é importante lembrar que o servidor precisará ser capaz de ler esses dados e processá-los corretamente. 
Muitas vezes, isso envolve a criação de um controlador no servidor que sabe como lidar com os dados enviados em um objeto FormData e extrair os valores necessários.*/