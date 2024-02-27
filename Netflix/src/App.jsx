import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Body from "./assets/Components/Body/Body";
import Header from "./assets/Components/HeaderComponent/Header";
import Footer from "./assets/Components/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Signup from "./assets/Components/Signup/Signup";
function App() {
  const [currentdata, setdata] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then(async (response) => {
        const { data } = await response;
        setdata(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
    
      <Header />
      <Body movies={currentdata} />
      <Footer />
    </>
  );
}

export default App;
