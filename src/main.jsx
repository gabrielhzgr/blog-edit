import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import { RouterProvider } from "react-router";
import { AuthProvider } from "./Providers/AuthProvider.jsx";
import router from "./router.jsx";
import "./index.css";
import { RouterProvider } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
);
