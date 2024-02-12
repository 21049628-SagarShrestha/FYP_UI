import React from "react";
import { BrowserRouter } from "react-router-dom";

//import all routes as AppRoutes
import { AppRoutes } from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
