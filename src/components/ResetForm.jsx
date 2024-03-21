import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import "@/assets/styles/forgotPassword.css";

import { useResetPasswordsMutation } from "../api/api";

const ResetForm = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [resetPasswords] = useResetPasswordsMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const submitAlbum = async (data) => {
    try {
      const requestData = {
        ...data,
        email,
        token,
      };
      const response = await resetPasswords(requestData).unwrap();

      console.log(response, "res");

      if (response.message !== null) {
        console.log("Password reset successful");
        alert("Password reset successful");
        navigate("/signin");
      } else {
        console.error("Password reset failed");
      }
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="main-wrapper">
        <div className="wrapper">
          <h1 className="font-semibold">Enter new Password</h1>

          <form onSubmit={handleSubmit(submitAlbum)}>
            <div className=" input-box">
              <input
                {...register("newPassword", { required: true })}
                placeholder="New Password"
                type="password"
              />
              <FaLock className="icon" />

              {errors.email && <p>email is required</p>}
            </div>
            <div className=" input-box">
              <input
                {...register("confirmPassword", { required: true })}
                placeholder="Confirm Password"
                type="password"
              />
              <FaLock className="icon" />

              {errors.email && <p>email is required</p>}
            </div>

            <input className="loginbutton" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetForm;
