import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

//import routes
import Index from "./pages/index";
import Error from "./components/Common/Error/Error";
import AdminHotel from "./pages/adminHotel";
import AdminDestination from "./pages/adminDestination";
import AdminAdventure from "./pages/adminAdventure";
import AdminTransport from "./pages/adminTransport";

//import user routes
import Adventure from "./pages/adventure";
import Destination from "./pages/destination";
import Transport from "./pages/transport";
import Hotels from "./pages/hotels";
import SignIn from "./pages/signIn";
import Rooms from "./pages/rooms";

//set routes to respective pages
export const AppRoutes = () => (
  <Routes>
    <Route path="signin" element={<SignIn />} />
    <Route path="/" element={<Index />} />
    <Route path="adminHotel" element={<AdminHotel />} />
    <Route path="adminDestination" element={<AdminDestination />} />
    <Route path="adminAdventure" element={<AdminAdventure />} />
    <Route path="adminTransport" element={<AdminTransport />} />
    <Route path="adventure" element={<Adventure />} />
    <Route path="destination" element={<Destination />} />
    <Route path="transport" element={<Transport />} />
    <Route path="hotels" element={<Hotels />} />
    <Route path="rooms" element={<Rooms />} />
    <Route path="*" element={<Error />} />
  </Routes>
);
