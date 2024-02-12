import React from "react";
import { Route, Routes } from "react-router-dom";

//import routes
import SignIn from "./pages/signIn";
import AdminHotel from "./pages/adminHotel";
import AdminDestination from "./pages/adminDestination";
//set routes to different pages
export const AppRoutes = () => (
  <Routes>
    <Route path="signin" element={<SignIn />} />
    <Route path="adminHotel" element={<AdminHotel />} />
    <Route path="adminDestination" element={<AdminDestination />} />
  </Routes>
);
