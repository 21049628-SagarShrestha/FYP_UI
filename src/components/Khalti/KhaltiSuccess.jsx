import React, { useEffect, useState } from "react";
import { useVerifySuccessesMutation } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  payementFailure,
  paymentStart,
  paymentSuccess,
} from "../../state/slices/paymentSlice";
import { useSelector } from "react-redux";

const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const [verifySuccesses] = useVerifySuccessesMutation();

  const pidx = searchParams.get("pidx");

  useEffect(() => {
    const submitAlbum = async () => {
      try {
        dispatch(paymentStart());
        console.log(pidx);
        const response = await verifySuccesses({ pidx });

        console.log(response.data.status, "res");
        if (response.data.status === "Completed") {
          dispatch(paymentSuccess());
          alert("Thank You! Payment has been received.");
          navigate("/confirmHotel");
        } else {
          dispatch(payementFailure());
        }
      } catch (error) {
        dispatch(payementFailure());
        console.error(error);
      }
    };

    submitAlbum(); // Call the function once
  }, []);
};
export default Success;
