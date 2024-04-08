import React, { useState, useEffect } from "react";
import { useAddFlightReservationsMutation } from "@/api/api";
import Khalti from "../Khalti/Khalti";
import { useSelector, useDispatch } from "react-redux";

import {
  reservationReset,
  reservationStart,
  reservationSuccess,
} from "../../state/slices/roomSlice";
import { paymentReset } from "../../state/slices/paymentSlice";

const ConfirmTransport = ({
  flightDate,
  airline,
  arrival_airport,
  departure_time,
  flight_time,
  price,
  departure_airport,
  passengers,
  resetConfirmation,
}) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { reservationStatus } = useSelector((state) => state.reservation);
  const { paymentStatus } = useSelector((state) => state.payment);

  useEffect(() => {
    const formData = {
      flightDate,
      airline,
      arrival_airport,
      departure_time,
      flight_time,
      price,
      departure_airport,
      passengers: passengers?.map((passenger) => ({
        passenger: passenger.passenger,
        phone: passenger.phone,
      })),
    };
    dispatch(reservationStart());
    dispatch(reservationSuccess(formData));
  }, []);

  const [addFlightReservations] = useAddFlightReservationsMutation();
  const [showPopup, setShowPopup] = useState(true);
  const [khaltiVisible, setKhaltiVisible] = useState(false);

  useEffect(() => {
    if (paymentStatus === "success") {
      handleConfirmBooking();
    }
  }, [paymentStatus]);

  const closePopup = () => {
    setShowPopup(false);
    resetConfirmation();
  };
  const handleKhaltiClick = () => {
    setKhaltiVisible(true);
  };

  const handleConfirmBooking = async () => {
    try {
      console.log("booked");
      await addFlightReservations(reservationStatus);
      setShowPopup(false);
      resetConfirmation();
      dispatch(paymentReset());
      dispatch(reservationReset());
      setTimeout(function () {
        navigate("/transport"); // Navigate to hotel page after 3 seconds
      }, 3000);
    } catch (error) {
      console.error("Error adding Flight Reservation:", error);
    }
  };

  return (
    <div>
      {showPopup && (
        <div style={popupStyles}>
          <div style={popupContentStyles}>
            <span style={closeButtonStyles} onClick={closePopup}>
              &times;
            </span>
            <div>
              <h2>Confirmation Details</h2>
              <p>Flight Date: {flightDate}</p>
              <p>Airline : {airline}</p>
              <p>Departure Airport: {departure_airport}</p>
              <p>Arrival Airport: {arrival_airport}</p>
              <p>Departure Time: {departure_time}</p>
              <p>Flight Dureation: {flight_time}</p>
              <p>Price: {price}</p>
              <button
                onClick={handleKhaltiClick}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                Pay with Khalti
              </button>{" "}
            </div>
          </div>
        </div>
      )}
      {khaltiVisible && <Khalti purpose={"flight"} />}
    </div>
  );
};

const popupStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const popupContentStyles = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const closeButtonStyles = {
  position: "absolute",
  top: "238px",
  right: "642px",
  cursor: "pointer",
  fontSize: "20px",
  color: "black",
};

export default ConfirmTransport;
