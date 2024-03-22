import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "@/assets/styles/register.css";

import { useRegisterUsersMutation } from "../api/api";
import Terms from "../components/Terms";

const Register = () => {
  const [registerUsers] = useRegisterUsersMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const submitAlbum = async (data) => {
    try {
      await registerUsers(data).unwrap();

      navigate("/signin");

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="main-wrapper">
        <div className="wrapper">
          <h1 className="font-semibold">Register</h1>

          <form onSubmit={handleSubmit(submitAlbum)}>
            <div className=" input-box">
              <input
                {...register("userName", { required: true })}
                placeholder="User Name"
                type="text"
              />
              <FaUser className="icon" />

              {errors.email && <p>email is required</p>}
            </div>
            <div className=" input-box">
              <input
                {...register("email", { required: true })}
                placeholder="Email"
                type="email"
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
            <div className=" input-box">
              <input
                {...register("confirmPassword", { required: true })}
                placeholder="Confirm Password"
                type="password"
              />
              <FaLock className="icon" />
              {errors.password && <p>password is required</p>}
            </div>

            <div className="register-link">
              <label className="flex justify-start ml-2 mb-2">
                <input
                  {...register("agreed", { required: true })}
                  type="checkbox"
                  className="mr-2 "
                />
                <p>
                  I agree the terms and conditions. <a href="/terms"> Terms</a>
                </p>
              </label>
              {errors.availability && <p>Availability is required</p>}
            </div>
            <input className="loginbutton" type="submit" value="Register" />

            <div className="register-link">
              <p>
                Already have an account?
                <a href="/signin"> Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
