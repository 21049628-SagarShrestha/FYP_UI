// ExampleComponent.js
import React, { useState } from "react";
import { useGetRoomsQuery, useDeleteRoomsMutation } from "@/api/api";
import AddRoom from "@/components/Hotel/AddRoom";
import { deleteFile } from "@/utils/firebaseStorage";
import Table from "../Common/Table";
import ViewRoomReservation from "./ViewRoomReservation";

const ViewRoom = ({ hotelId }) => {
  const { data: { Rooms: rooms } = {}, error, isLoading } = useGetRoomsQuery();
  const filteredRooms = rooms?.filter((room) => room.hotelId === hotelId);
  //   const [rooms, setRooms] = useState("");
  const [images, setImages] = useState("");
  const [roomsId, setRoomsId] = useState("");
  const [room_num, setRoom_num] = useState("");

  const [showButton, setShowButton] = useState(false);
  const [showViewButton, setShowViewButton] = useState(false);
  const [deleteRooms] = useDeleteRoomsMutation();
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching hotels</p>;
  }

  const deleteRoom = async (id, image) => {
    try {
      const deletePromises = image.map(async (x) => {
        return deleteFile(x);
      });
      await Promise.all(deletePromises);
      await deleteRooms(id);
    } catch (error) {
      console.error(`Error deleting Room:`, error);
    }
  };

  const columns = [
    {
      Header: "Image",
      accessor: "image",
      Cell: ({ cell: { value }, row: { original } }) => (
        <img src={value} alt={original.name} height={90} width={90} />
      ),
    },
    {
      Header: "Room Number",
      accessor: "roomNumber",
    },
    {
      Header: "Room Type",
      accessor: "roomType",
    },
    {
      Header: "Price Per Night",
      accessor: "pricePerNight",
    },
    {
      Header: "Availability",
      accessor: "availability",
    },
    {
      Header: "Facilities",
      accessor: "facilities",
    },
    {
      Header: "Action",
      accessor: "_id",
      Cell: ({ cell: { value }, row: { original } }) => (
        <div className="flex gap-2">
          <a
            className=" bg-slate-500 h-10 text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
            onClick={() => {
              setShowViewButton(true);
              setRoom_num(original.roomNumber);
            }}
          >
            Reservation
          </a>
          <br />
          <a
            className=" bg-red-500 h-10 text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
            onClick={() => deleteRoom(value, original.image)}
          >
            Delete
          </a>
          <br />
          <a
            className=" bg-slate-500 h-10 text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
            onClick={() => {
              setRoomsId(value);
              setImages(original.image);
              setShowButton(true);
            }}
          >
            Edit
          </a>
        </div>
      ),
    },
  ];

  return (
    <div>
      {showButton && (
        <AddRoom hotelId={hotelId} roomId={roomsId} image={images} />
      )}
      <div className="flex justify-center items-center">
        <button
          className=" bg-slate-500 text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
          onClick={() => setShowButton(true)}
        >
          Add More Room
        </button>
      </div>

      <div className="m-auto border border-black bg-white gap-2rem rounded-lg p-3 max-w-4xl mx-auto my-10 ">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {filteredRooms.length === 0 ? (
              <p>No Room available for selected hotel</p>
            ) : (
              <Table columns={columns} data={filteredRooms} />
            )}
          </div>
        )}
      </div>
      {showViewButton && (
        <ViewRoomReservation room_num={room_num} hotelId={hotelId} />
      )}
    </div>
  );
};
export default ViewRoom;
