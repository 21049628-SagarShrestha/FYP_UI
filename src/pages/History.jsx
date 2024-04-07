// History.jsx

import React from "react";
import {
  useGetAdventureReservationsQuery,
  useGetRoomReservationsQuery,
} from "../api/api";
import "@/assets/Styles/history.css";

const History = () => {
  const { data: { AdventureReservation: adventureReserves } = {} } =
    useGetAdventureReservationsQuery();
  const { data: { RoomReservation: roomReserves } = {} } =
    useGetRoomReservationsQuery();

  return (
    <div className="history-container">
      <h2 className="section-title">Adventure Reservations</h2>
      {adventureReserves &&
        adventureReserves.map((reservation, index) => (
          <div
            key={`adventure_${index}`}
            className="reservation-card adventure-reservation"
          >
            <div className="reservation-details">
              <p>Reservation ID: {reservation._id}</p>
              <p>
                Event Date:{" "}
                {new Date(reservation.eventDate).toLocaleDateString()}
              </p>
              <p>User Name: {reservation.userName}</p>
              <p>Phone: {reservation.phone}</p>
              <p>Event: {reservation.event}</p>
              <p>Price: {reservation.price}</p>
            </div>
          </div>
        ))}

      <h2 className="section-title">Room Reservations</h2>
      {roomReserves &&
        roomReserves.map((reservation, index) => (
          <div
            key={`room_${index}`}
            className="reservation-card room-reservation"
          >
            <div className="reservation-details">
              <p>Reservation ID: {reservation._id}</p>
              <p>Room Number: {reservation.room}</p>
              <p>
                Check-in Date:{" "}
                {new Date(reservation.checkInDate).toLocaleDateString()}
              </p>
              <p>
                Check-out Date:{" "}
                {new Date(reservation.checkOutDate).toLocaleDateString()}
              </p>
              <p>User Email: {reservation.user}</p>
              <p>Total Amount: {reservation.totalAmount}</p>
              <p>Total Days: {reservation.totalDays}</p>
              <p>Facilities: {reservation.facilities.join(", ")}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default History;
