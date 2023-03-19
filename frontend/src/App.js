import logo from "./logo.svg";
import "./App.css";

//Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login ";
import Register from "./pages/Auth/Register";

//Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
