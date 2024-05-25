import React, { useState } from "react";
import { useAddAdventureReservationsMutation } from "@/api/api";
import Khalti from "../Khalti/Khalti";
import { useSelector, useDispatch } from "react-redux";
import {
  reservationReset,
  reservationStart,
  reservationSuccess,
} from "../../state/slices/roomSlice";
import { paymentReset } from "../../state/slices/paymentSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ConfirmAdventure = ({
  eventDate,
  userName,
  phone, 
  event,
  price,
  adventureId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { reservationStatus } = useSelector((state) => state.reservation);
  const { paymentStatus } = useSelector((state) => state.payment);
  // Dispatch reservationStart and reservationSuccess when component mounts
  useEffect(() => {
    const formData = {
      eventDate,
      userName,
      phone,
      event,
      price,
      adventureId,
      user: currentUser.email,
    };

    dispatch(reservationStart());
    dispatch(reservationSuccess(formData));
  }, []);

  const [addAdventureReservations] = useAddAdventureReservationsMutation();
  const [showPopup, setShowPopup] = useState(true);
  const [khaltiVisible, setKhaltiVisible] = useState(false);

  useEffect(() => {
    if (paymentStatus === "success") {
      handleConfirmBooking();
    }
  }, [paymentStatus]);

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleKhaltiClick = () => {
    setKhaltiVisible(true);
  };

  const handleConfirmBooking = async () => {
    try {
      await addAdventureReservations(reservationStatus);
      dispatch(paymentReset());
      dispatch(reservationReset());
      setTimeout(function () {
        navigate("/adventure"); // Navigate to adventure page after 3 seconds
      }, 3000);
    } catch (error) {
      console.error("Error adding Adventure:", error);
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
              <p>Event Date: {eventDate}</p>
              <p>UserName: {userName}</p>
              <p>Phone: {phone}</p>
              <p>Price: {price}</p>
              <p>Event: {event}</p>
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
      {khaltiVisible && <Khalti amounto={price} purpose={"adventure"} />}
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

export default ConfirmAdventure;
