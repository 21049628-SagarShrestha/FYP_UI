import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

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
      <div>
        <h1>Login</h1>

        <form onSubmit={handleSubmit(submitAlbum)}>
          <input
            {...register("email", { required: true })}
            placeholder="Email"
            type="email"
            name="email" // Add name attribute
          />
          {errors.email && <p>email is required</p>}
          <input
            {...register("password", { required: true })}
            placeholder="Password"
            type="password"
          />
          {errors.password && <p>password is required</p>}

          <input type="submit" value="Login" />

          <p>
            Don't have an account?
            <a href="/signin"> Register</a>
          </p>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

export default Login;
