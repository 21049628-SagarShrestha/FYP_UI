import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "@/assets/styles/ChangePassword.css";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useChangePasswordsMutation } from "../api/api";
import { useSelector } from "react-redux";

const ChangePassword = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [changePasswords] = useChangePasswordsMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitAlbum = async (data) => {
    try {
      const requestData = {
        ...data,
        email: currentUser.email,
      };
      await changePasswords(requestData).unwrap();
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="main-wrapper">
        <div className="wrapper">
          <h1 className="font-semibold">Change Password</h1>

          <form onSubmit={handleSubmit(submitAlbum)}>
            <div className="input-box">
              <input
                {...register("oldPassword", { required: true })}
                placeholder="Old Password"
                type={showPassword ? "text" : "password"}
              />
              <button
                className="icon"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.oldPassword && <p>Old Password is required</p>}
            </div>

            <div className="input-box">
              <input
                {...register("newPassword", { required: true })}
                placeholder="New Password"
                type={showPassword ? "text" : "password"}
              />
              <button
                className="icon"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
              </button>
              {errors.newPassword && <p>New Password is required</p>}
            </div>

            <div className="input-box">
              <input
                {...register("confirmPassword", { required: false })}
                placeholder="Confirm Password"
                type={showPassword ? "text" : "password"}
              />
              <button
                className="icon"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
              </button>
              {errors.confirmPassword && <p>Confirm Password is required</p>}
            </div>

            <input
              className="loginbutton"
              type="submit"
              value="Change Password"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
