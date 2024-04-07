import React, { useState } from "react";
import { useGetUsersQuery } from "../api/api";
import ChangePassword from "../components/ChangePassword";
import "@/assets/styles/profile.css";
import { useSelector, useDispatch } from "react-redux";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../state/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { data: { Users: users } = {}, error, isLoading } = useGetUsersQuery();
  const reqUser = users?.filter((user) => user.email === currentUser.email)[0];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());

      const response = await fetch(`http://localhost:8081/signout`, {
        method: "GET",
        credentials: "include", // Include credentials (cookies) with the request
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure());
    }
  };
  return (
    <>
      <div className="main-wrapper">
        <div className="wrapper">
          <h1 className="font-semibold">Login</h1>
          {reqUser ? (
            <div className="user-container">
              <div>
                <p>User Name: {reqUser.userName}</p>
                <p>Email: {reqUser.email}</p>
                <p>Role: {reqUser.role}</p>
              </div>
              <div>
                <button
                  onClick={() => navigate("/changePassword")}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Change Password
                </button>
                <button
                  onClick={() => navigate("/history")}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  View History
                </button>

                {currentUser && (
                  <span
                    onClick={handleSignOut}
                    className="text-red-700 cursor-pointer"
                  >
                    Sign out
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div>Loading..</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
