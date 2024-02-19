import React, { useState } from "react";
import { useAddRoomReservationsMutation } from "@/api/api";

const confirmHotel = ({
  checkInDate,
  checkOutDate,
  totalDays,
  price,
  room_num,
}) => {
  const [addRoomReservations] = useAddRoomReservationsMutation();
  const [showPopup, setShowPopup] = useState(true);
  const amount = price * totalDays;
  const closePopup = () => {
    setShowPopup(false);
  };

  const submitAlbum = async () => {
    try {
      const formData = {
        room: room_num,
        checkInDate,
        checkOutDate,
        totalDays,
        totalAmount: amount,
      };

      await addRoomReservations(formData);
    } catch (error) {
      console.error("Error adding hotels:", error);
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
              <p>Check-In Date: {checkInDate}</p>
              <p>Check-Out Date: {checkOutDate}</p>
              <p>Total Number of Days: {totalDays}</p>
              <p>Amount: {amount}</p>

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

export default confirmHotel;
