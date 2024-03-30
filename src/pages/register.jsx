import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "@/assets/styles/register.css";
import { useRegisterUsersMutation } from "../api/api";
import Terms from "../components/Terms";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Login from "./SignIn";

const schema = yup.object().shape({
  userName: yup.string().required("Userame is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Confirm Password does not match")
    .required("Confirm Password is required"),
  agreed: yup
    .bool()
    .oneOf([true], "You must accept terms and conditions")
    .required("Accept terms and conditions"),
});

const Register = ({ onClickBack }) => {
  const [registerUsers] = useRegisterUsersMutation();
  const [message, setMessage] = useState();
  const [click, setClick] = useState(true);
  const [login, setLogin] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const submitAlbum = async (data) => {
    try {
      const response = await registerUsers(data).unwrap();
      toast.success(response.message, {
        position: "top-right",
      });
      reset();
      navigate("/signin");
    } catch (error) {
      toast.error("Invalid Registration!", {
        position: "top-right",
      });
      setMessage(error.data.message);
    }
  };

  return (
    <>
      <div>
        {click ? (
          <div>
            <h1 className="font-semibold">Register</h1>
            {message}
            <form onSubmit={handleSubmit(submitAlbum)}>
              <div className=" input-box">
                <input
                  {...register("userName", {
                    validate: {
                      required: (value) =>
                        schema.userName.required().isValid(value),
                    },
                  })}
                  placeholder="User Name"
                  type="text"
                />
                <FaUser className="icon" />
                {errors.userName?.message && <p>{errors.userName?.message}</p>}
              </div>
              <div className=" input-box">
                <input
                  {...register("email", {
                    validate: {
                      required: (value) =>
                        schema.email.required().isValid(value),
                    },
                  })}
                  placeholder="Email"
                  type="email"
                />
                <FaEnvelope className="icon" />

                {errors.email?.message && <p>{errors.email?.message}</p>}
              </div>
              <div className=" input-box">
                <input
                  {...register("password", {
                    validate: {
                      required: (value) =>
                        schema.password.required().isValid(value),
                    },
                  })}
                  placeholder="Password"
                  type="password"
                />
                <FaLock className="icon" />
                {errors.password?.message && <p>{errors.password?.message}</p>}
              </div>
              <div className=" input-box">
                <input
                  {...register("confirmPassword", {
                    validate: {
                      required: (value) =>
                        schema.confirmPassword.required().isValid(value),
                    },
                  })}
                  placeholder="Confirm Password"
                  type="password"
                />
                <FaLock className="icon" />
                {errors.confirmPassword?.message && (
                  <p>{errors.confirmPassword?.message}</p>
                )}
              </div>

              <div className="register-link">
                <label className="flex justify-start ml-2 mb-2">
                  <input
                    {...register("agreed", {
                      validate: {
                        required: (value) =>
                          schema.confirmPassword.required().isValid(value),
                      },
                    })}
                    type="checkbox"
                    className="mr-2"
                  />
                  <p>
                    I agree the terms and conditions.
                    <a onClick={() => setClick(false)}> Terms</a>
                  </p>
                </label>
                {errors.agreed?.message && <p>{errors.agreed?.message}</p>}
              </div>
              <input className="loginbutton" type="submit" value="Register" />

              <div className="register-link">
                <p>
                  Already have an account?
                  <a onClick={() => onClickBack()}> Login</a>
                </p>
              </div>
            </form>
          </div>
        ) : (
          <Terms onClickGoBack={() => setClick(true)} />
        )}
      </div>
    </>
  );
};

export default Register;
