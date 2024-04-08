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
  console.log(reservationStatus);
  useEffect(() => {
    const submitAlbum = async () => {
      try {
        dispatch(paymentStart());
        const response = await verifySuccesses({ pidx });

        if (response.data.status === "Completed") {
          dispatch(paymentSuccess());
          alert("Thank You! Payment has been received.");
          if (purpose === "hotel") {
            console.log("aana");
            navigate("/confirmHotel");
          } else if (purpose === "adventure") {
            console.log("advenrurueureueur");
            navigate("/confirmAdventure");
          } else if (purpose === "flight") {
            console.log("flightutututtuttut");
            navigate("/confirmTransport");
          } else {
            console.log("buwa");
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
