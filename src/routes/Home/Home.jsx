// import { useState } from "react";
// import heroImg from "./assets/hero.png";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
import "./Home.css";
import Nav from "../../Components/Nav/Nav.jsx";
import { Outlet, redirect } from "react-router";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth.jsx";
// loader

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    navigate("/posts");
  }, [user]);

  return (
    <>
      <Nav></Nav>

      <Outlet></Outlet>
    </>
  );
}

export default Home;
