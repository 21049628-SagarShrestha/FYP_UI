import React, { useState } from "react";
import { useAddFlightReservationsMutation } from "@/api/api";

const ConfirmTransport = ({
  flightDate,
  airline,
  arrival_airport,
  departure_time,
  flight_time,
  price,
  departure_airport,
  userName,
  phone,
  resetConfirmation,
}) => {
  const [addFlightReservations] = useAddFlightReservationsMutation();
  const [showPopup, setShowPopup] = useState(true);
  const closePopup = () => {
    setShowPopup(false);
    resetConfirmation();
  };

  const submitAlbum = async () => {
    try {
      const formData = {
        flightDate,
        airline,
        arrival_airport,
        departure_time,
        flight_time,
        price,
        departure_airport,
        userName,
        phone,
      };

      await addFlightReservations(formData);
      setShowPopup(false);
      resetConfirmation();
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
              <p>UserName: {userName}</p>
              <p>Phone: {phone}</p>
              <p>Flight Date: {flightDate}</p>
              <p>Airline : {airline}</p>
              <p>Departure Airport: {departure_airport}</p>
              <p>Arrival Airport: {arrival_airport}</p>
              <p>Departure Time: {departure_time}</p>
              <p>Flight Dureation: {flight_time}</p>
              <p>Price: {price}</p>

              <button onClick={submitAlbum}>Book</button>
              <button>Pay with Khalti</button>
            </div>
          </div>
        </div>
      )}
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
  top: "10px",
  right: "10px",
  cursor: "pointer",
  fontSize: "20px",
  color: "#888",
};

export default ConfirmTransport;
