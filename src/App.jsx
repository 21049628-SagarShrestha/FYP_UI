import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import all routes as AppRoutes
import { AppRoutes } from "./routes";
import Header from "./components/Common/Header.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
      <ToastContainer />
    </BrowserRouter>
  );
}
