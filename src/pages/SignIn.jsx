import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAddUsersMutation } from "../api/api";
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

  const submitAlbum = async (data) => {
    try {
      await addUsers(data).unwrap();
      // reset();

      // const display = () => {
      //   toast("loggedIn", {
      //     position: "top-center",
      //   });
      // };
      // display();
    } catch (error) {
      console.error("Error logging user:", error);
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
          <input
            {...register("confirmPassword", { required: true })}
            placeholder="Confirm Password"
            type="password"
          />
          {errors.confirmPassword && <p>confirmPassword is required</p>}
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
