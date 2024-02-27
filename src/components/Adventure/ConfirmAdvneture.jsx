import React, { useState } from "react";
import { useAddAdventureReservationsMutation } from "@/api/api";

const ConfirmAdventure = ({ eventDate, userName, phone, event }) => {
  const [addAdventureReservations] = useAddAdventureReservationsMutation();
  const [showPopup, setShowPopup] = useState(true);
  const closePopup = () => {
    setShowPopup(false);
  };

  const submitAlbum = async () => {
    try {
      const formData = {
        eventDate,
        userName,
        phone,
        event,
        price: "1500",
      };

      await addAdventureReservations(formData);
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
              <p>Event: {event}</p>

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

export default ConfirmAdventure;
