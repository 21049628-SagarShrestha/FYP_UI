import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "@/assets/styles/SignIn.css";

import { useAddUsersMutation } from "../api/api";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "@/state/slices/userSlice";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [addUsers] = useAddUsersMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser, "u");
  const submitAlbum = async (data) => {
    try {
      dispatch(signInStart());

      await addUsers(data).unwrap();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");

      reset();

      // const display = () => {
      //   toast("loggedIn", {
      //     position: "top-center",
      //   });
      // };
      // display();
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <>
      <div className="main-wrapper">
        <div className="wrapper">
          <h1 className="font-semibold">Login</h1>

          <form onSubmit={handleSubmit(submitAlbum)}>
            <div className=" input-box">
              <input
                {...register("email", { required: true })}
                placeholder="Email"
                type="email"
                name="email" // Add name attribute
              />
              <FaEnvelope className="icon" />

              {errors.email && <p>email is required</p>}
            </div>
            <div className=" input-box">
              <input
                {...register("password", { required: true })}
                placeholder="Password"
                type="password"
              />
              <FaLock className="icon" />
              {errors.password && <p>password is required</p>}
            </div>

            <input className="loginbutton" type="submit" value="Login" />

            <div className="register-link">
              <p>
                Don't have an account?
                <a href="/signin"> Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

export default Login;
