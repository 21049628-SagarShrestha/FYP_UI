import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "@/assets/styles/forgotPassword.css";

import { usePasswordResetsMutation } from "../api/api";

const ForgotPassword = () => {
  const [passwordResets] = usePasswordResetsMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const submitAlbum = async (data) => {
    try {
      await passwordResets(data).unwrap();

      alert(
        "A mail to reset password has been sent to you email. You may exit this page!"
      );

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="main-wrapper">
        <div className="wrapper">
          <h1 className="font-semibold">Find your account</h1>

          <form onSubmit={handleSubmit(submitAlbum)}>
            <label className="label1">
              Please enter your email to search for your account.
            </label>
            <div className=" input-box">
              <input
                {...register("email", { required: true })}
                placeholder="Email"
                type="email"
                name="email"
              />
              <FaEnvelope className="icon" />

              {errors.email && <p>email is required</p>}
            </div>

            <input className="loginbutton" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
