import "./App.css";

//Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Hooks
import { useAuth } from "./hooks/useAuth";

//Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login ";
import Register from "./pages/Auth/Register";

//Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  const { auth, loading } = useAuth(); //Já começa como autenticado por conta do slice, pois ele já pega do localStorage antes de fazer o initialState

  console.log(auth);

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
              path="/login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            ></Route>
            <Route
              path="/register"
              element={!auth ? <Register /> : <Navigate to="/" />}
            ></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
