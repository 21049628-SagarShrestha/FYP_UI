import React, { useState } from "react";
import { useAddRoomReservationsMutation } from "@/api/api";
import Khalti from "../Khalti/Khalti";
import { useSelector, useDispatch } from "react-redux";

const ConfirmHotel = ({
  checkInDate,
  checkOutDate,
  totalDays,
  price,
  room_num,
}) => {
  const dispatch = useDispatch();
  const [addRoomReservations] = useAddRoomReservationsMutation();
  const [showPopup, setShowPopup] = useState(true);
  const [khaltiVisible, setKhaltiVisible] = useState(false); // State to manage Khalti visibility
  const amount = price * totalDays;

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleKhaltiClick = () => {
    setKhaltiVisible(true); // Set Khalti visibility
  };

  const handleConfirmBooking = async () => {
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
              </button>
            </div>
          </div>
        </div>
      )}
      {khaltiVisible && <Khalti />}
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
  top: "275px",
  right: "660px",
  cursor: "pointer",
  fontSize: "20px",
  color: "black",
};

export default ConfirmHotel;
