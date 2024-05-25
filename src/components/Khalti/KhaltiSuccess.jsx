import React, { useEffect, useState } from "react";
import { useVerifySuccessesMutation } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  payementFailure,
  paymentStart,
  paymentSuccess,
} from "../../state/slices/paymentSlice";

const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const pidx = searchParams.get("pidx");
  const purpose = searchParams.get("purchase_order_name");
  const [verifySuccesses] = useVerifySuccessesMutation();
  const { reservationStatus } = useSelector((state) => state.reservation);
  useEffect(() => {
    const submitAlbum = async () => {
      try {
        dispatch(paymentStart());
        const response = await verifySuccesses({ pidx });
        if (response.data.status === "Completed") {
          dispatch(paymentSuccess());
          alert("Thank You! Payment has been received.");
          if (purpose === "hotel") {
            navigate("/confirmHotel");
          } else if (purpose === "adventure") {
            navigate("/confirmAdventure");
          } else if (purpose === "flight") {
            navigate("/confirmTransport");
          } else {
            return null;
          }
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
