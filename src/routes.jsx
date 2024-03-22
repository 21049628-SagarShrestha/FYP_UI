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
import Rooms from "./pages/rooms";
import SignIn from "./pages/SignIn";
import Profile from "./pages/profile";
import ChangePassword from "./components/ChangePassword";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgotPassword";
import ResetForm from "./components/ResetForm";
import Success from "./components/Khalti/KhaltiSuccess";
import Terms from "./components/Terms";

//set routes to respective pages
export const AppRoutes = () => (
  <Routes>
    <Route path="signin" element={<SignIn />} />
    <Route path="*" element={<Error />} />
    <Route path="/register" element={<Register />} />
    <Route path="/resetForm" element={<ResetForm />} />
    <Route path="/forgotPassword" element={<ForgotPassword />} />
    <Route path="/terms" element={<Terms />} />
    <Route element={<PrivateRoute />}>
      <Route path="/" element={<Index />} />
      <Route path="khalti-success" element={<Success />} />
      <Route path="adminHotel" element={<AdminHotel />} />
      <Route path="adminDestination" element={<AdminDestination />} />
      <Route path="adminAdventure" element={<AdminAdventure />} />
      <Route path="adminTransport" element={<AdminTransport />} />
      <Route path="adventure" element={<Adventure />} />
      <Route path="destination" element={<Destination />} />
      <Route path="transport" element={<Transport />} />
      <Route path="hotels" element={<Hotels />} />
      <Route path="rooms" element={<Rooms />} />
      <Route path="profile" element={<Profile />} />
      <Route path="changePassword" element={<ChangePassword />} />
    </Route>
  </Routes>
);
