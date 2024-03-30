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
          <a 
          className=" bg-red-500 h-10 text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
          onClick={() => deleteRoomReservation(value)}>
            Delete</a>
          <br />
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="m-auto border border-black bg-white gap-2rem rounded-lg p-3 max-w-2xl mx-auto my-10 ">
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
