import React, { useState, useEffect } from "react";
import { useAddRoomReservationsMutation } from "@/api/api";
import Khalti from "../Khalti/Khalti";
import { useSelector, useDispatch } from "react-redux";
import {
  reservationReset,
  reservationStart,
  reservationSuccess,
} from "../../state/slices/roomSlice";
import { paymentReset } from "../../state/slices/paymentSlice";

const ConfirmHotel = ({
  checkInDate,
  checkOutDate,
  totalDays,
  price,
  room_num,
  facilities,
}) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { reservationStatus } = useSelector((state) => state.reservation);
  const { paymentStatus } = useSelector((state) => state.payment);

  console.log(reservationStatus, "status");
  console.log(paymentStatus, "ppppppptatus");

  // Dispatch reservationStart and reservationSuccess when component mounts
  useEffect(() => {
    const formData = {
      room: room_num,
      checkInDate,
      checkOutDate,
      totalDays,
      totalAmount: price * totalDays,
      user: currentUser.email,
      facilities,
    };
    dispatch(reservationStart());
    dispatch(reservationSuccess(formData));
  }, []);

  const [addRoomReservations] = useAddRoomReservationsMutation();
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
      await addRoomReservations(reservationStatus);
      console.log("helo");
      dispatch(paymentReset());
      dispatch(reservationReset());
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
              <p>Amount: {price * totalDays}</p>

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
      {khaltiVisible && <Khalti amounto={price * totalDays} />}
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
