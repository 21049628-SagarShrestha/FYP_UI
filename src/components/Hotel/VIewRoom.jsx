// ExampleComponent.js
import React, { useState } from "react";
import { useGetRoomsQuery, useDeleteRoomsMutation } from "@/api/api";
import AddRoom from "@/components/Hotel/AddRoom";
import { deleteFile } from "@/utils/firebaseStorage";
import Table from "../Common/Table";

const ViewRoom = ({ hotelId }) => {
  const { data: { Rooms: rooms } = {}, error, isLoading } = useGetRoomsQuery();
  const filteredRooms = rooms?.filter((room) => room.hotelId === hotelId);
  //   const [rooms, setRooms] = useState("");
  const [images, setImages] = useState("");
  const [roomsId, setRoomsId] = useState("");

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
        <>
          <a onClick={() => deleteRoom(value, original.image)}>Delete Room</a>
          <br />
          <a
            onClick={() => {
              setRoomsId(value);
              setImages(original.image);
              setShowButton(true);
            }}
          >
            Edit Room
          </a>
        </>
      ),
    },
  ];

  return (
    <div>
      {showButton && (
        <AddRoom hotelId={hotelId} roomId={roomsId} image={images} />
      )}
      <button onClick={() => setShowButton(true)}>Add More Room</button>
      <div>
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
      {showViewButton && <AddRoom hotelId={rooms} />}
    </div>
  );
};
export default ViewRoom;
