// ExampleComponent.js
import React, { useState } from "react";
import {
  useGetRoomReservationsQuery,
  useDeleteRoomReservationsMutation,
} from "@/api/api";
import Table from "../Common/Table";

const ViewRoomReservation = ({ room_num }) => {
  const {
    data: { RoomReservation: reserves } = {},
    error,
    isLoading,
  } = useGetRoomReservationsQuery();

  const reservations = reserves?.filter((reserve) => reserve.room === room_num);

  const [deleteRoomReservations] = useDeleteRoomReservationsMutation();
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching hotels</p>;
  }

  const deleteRoomReservation = async (id) => {
    try {
      await deleteRoomReservations(id);
    } catch (error) {
      console.error(`Error deleting Room Reservation:`, error);
    }
  };

  const columns = [
    {
      Header: "Check In Date",
      accessor: "checkInDate",
    },
    {
      Header: "Check Out Date",
      accessor: "checkOutDate",
    },
    {
      Header: "Amount",
      accessor: "totalAmount",
    },
    {
      Header: "Days",
      accessor: "totalDays",
    },

    {
      Header: "Action",
      accessor: "_id",
      Cell: ({ cell: { value } }) => (
        <>
          <a onClick={() => deleteRoomReservation(value)}>Delete</a>
          <br />
        </>
      ),
    },
  ];

  return (
    <div>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {reservations.length === 0 ? (
              <p>No Reservation available for selected room</p>
            ) : (
              <Table columns={columns} data={reservations} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default ViewRoomReservation;
