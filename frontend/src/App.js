import "./App.css";

//Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Hooks
import { useAuth } from "./hooks/useAuth";

//Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

//Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import EditProfile from "./pages/EditProfile/EditProfile";
import Profile from "./pages/Profile/Profile";
import Photo from "./pages/Photo/Photo";
import Search from "./pages/Search/Search";

import { useEffect, useState } from "react";
import { testing } from "./slices/authSlice";
import { useDispatch } from "react-redux";

function App() {
  const { auth, loading } = useAuth(); //Já começa como autenticado por conta do slice, pois ele já pega do localStorage antes de fazer o initialState
  const [localAuth, setLocalAuth] = useState(auth)

  console.log('AUTH APP MUDADO_____________________________________', auth);
  const dispatch = useDispatch();

  //Testamdo se o token foi invalidado pelo prazo dos 7 dias
  // useEffect(() => {
  //   dispatch(testing());
  // }, []);


  useEffect(() => {
    setLocalAuth(auth)
  }, [auth])

  if (loading) {
    return <p>Carregando</p>;
  }

  return (
    <div className="App">
      {/* <BrowserRouter basename={process.env.PUBLIC_URL}> */}
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={auth ? <Home /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/profile"
              element={auth ? <EditProfile /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/photos/:id"
              element={auth ? <Photo /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/users/:id"
              element={auth ? <Profile /> : <Navigate to="/login" />}
            ></Route>
            {/* <Route path="/" element={!auth ? <Login /> : <Navigate to="/" />} />  */}
            <Route
              path="/login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            ></Route>
            <Route
              path="/register"
              element={!auth ? <Register /> : <Navigate to="/" />}
            ></Route>
            <Route
              path="/search"
              element={localAuth ? <Search /> : <Navigate to="/login" />}
            ></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
