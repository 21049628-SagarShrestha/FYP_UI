// ExampleComponent.js
import React, { useState } from "react";
import { useGetHotelsQuery, useDeleteHotelsMutation } from "@/api/api";
import AddHotel from "@/components/Hotel/AddHotel";
import { deleteFile } from "../utils/firebaseStorage";
import ViewRoom from "../components/Hotel/ViewRoom";
import Table from "../components/Common/Table";

const adminHotel = () => {
  const {
    data: { Hotels: hotels } = {},
    error,
    isLoading,
  } = useGetHotelsQuery();
  const [rooms, setRooms] = useState("");
  const [images, setImages] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [viewRoom, setViewRoom] = useState(false);
  const [deleteHotels] = useDeleteHotelsMutation();
  console.log("render", rooms, images, showButton, viewRoom);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching hotels</p>;
  }

  const deleteHotel = async (id, image) => {
    try {
      const deletePromises = image.map(async (x) => {
        return deleteFile(x);
      });
      await Promise.all(deletePromises);
      await deleteHotels(id);
    } catch (error) {
      console.error(`Error deleting Hotel:`, error);
    }
  };

  const data = hotels || [];
  const columns = [
    {
      Header: "Image",
      accessor: "image",
      Cell: ({ cell: { value }, row: { original } }) => (
        <img src={value} alt={original.name} height={90} width={90} />
      ),
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Location",
      accessor: "location",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Room",
      accessor: "room",
    },
    {
      Header: "Facilities",
      accessor: "facilities",
    },
    {
      Header: "Rating",
      accessor: "rating",
    },
    {
      Header: "Contact",
      accessor: "contact",
    },
    {
      Header: "Action",
      accessor: "_id",
      Cell: ({ cell: { value }, row: { original } }) => (
        <>
          <a
            onClick={() => {
              setViewRoom(true);
              setRooms(value);
            }}
          >
            View Room
          </a>
          <br />
          <a onClick={() => deleteHotel(value, original.image)}>Delete Hotel</a>
          <br />
          <a
            onClick={() => {
              setRooms(value);
              setImages(original.image);
              setShowButton(true);
            }}
          >
            Edit Hotel
          </a>
        </>
      ),
    },
  ];

  return (
    <div>
      {showButton && <AddHotel hotelId={rooms} image={images} />}
      <button onClick={() => setShowButton(true)}>Add More Hotels</button>
      <div>
        <Table columns={columns} data={data} />
      </div>
      {viewRoom && <ViewRoom hotelId={rooms} />}
    </div>
  );
};

export default adminHotel;
