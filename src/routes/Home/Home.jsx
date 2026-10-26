// import { useState } from "react";
// import heroImg from "./assets/hero.png";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
import "./Home.css";
import Nav from "../../Components/Nav/Nav.jsx";
import { Outlet, redirect, useLocation, useParams } from "react-router";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth.jsx";
// loader

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const params = useParams();
  const logation = useLocation();
  useEffect(() => {
    if (location == "/") {
      navigate("/posts");
    }
  }, []);

  return (
    <>
      <Nav></Nav>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
}

export default Home;
