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
import { toast } from "react-toastify";
import Register from "./register";

const Login = ({ onClickGoBack }) => {
  const [message, setMessage] = useState();
  const [login, setLogin] = useState(true);

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
  console.log(currentUser, "uu");
  const submitAlbum = async (data) => {
    try {
      dispatch(signInStart());
      const response = await addUsers(data).unwrap();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      reset();
      toast.success("Login successful!", {
        position: "top-right",
      });
      if (response.role === "admin") {
        navigate("/adminHotel");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid Login!", {
        position: "top-right",
      });
      dispatch(signInFailure(error.message));
      setMessage(error.data.message);
    }
  };

  return (
    <>
      <div className="main-wrapper">
        <div className="wrapper">
          {login ? (
            <div>
              <h1 className="font-semibold">Login</h1>
              {message}
              <form onSubmit={handleSubmit(submitAlbum)}>
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
                <div className=" input-box">
                  <input
                    {...register("password", { required: true })}
                    placeholder="Password"
                    type="password"
                  />
                  <FaLock className="icon" />
                  {errors.password && <p>password is required</p>}
                </div>
                <div className="register-link">
                  <p>
                    <a href="/forgotPassword">Forgot Password ?</a>
                  </p>
                </div>

                <input className="loginbutton" type="submit" value="Login" />

                <div className="register-link">
                  <p>
                    Don't have an account?
                    <a onClick={() => setLogin(false)}> Register</a>
                  </p>
                </div>
              </form>
            </div>
          ) : (
            <Register onClickBack={() => setLogin(true)} />
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
