// ExampleComponent.js
import React, { useState } from "react";
import { useGetHotelsAdminQuery, useDeleteHotelsMutation } from "@/api/api";
import AddHotel from "@/components/Hotel/AddHotel";
import { deleteFile } from "../utils/firebaseStorage";
import ViewRoom from "../components/Hotel/ViewRoom";
import Table from "../components/Common/Table";
import { toast } from "react-toastify";
import AdminHeader from "../components/Common/AdminHeader";

const adminHotel = () => {
  const {
    data: { Hotels: hotels } = {},
    error,
    isLoading,
  } = useGetHotelsAdminQuery();
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
    return <p>{error.data.message}</p>;
  }

  const deleteHotel = async (id, image) => {
    try {
      const deletePromises = image.map(async (x) => {
        return deleteFile(x);
      });
      await deleteHotels(id);
      await Promise.all(deletePromises);
      toast.success("Hotel Deletion successful!", {
        position: "top-right",
      });
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
        <div className="flex gap-2">
          <a
            className=" bg-slate-500 h-10 text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
            onClick={() => {
              setViewRoom(true);
              setRooms(value);
            }}
          >
            Room
          </a>
          <br />
          <br />
          <a
            className=" bg-red-500 h-10 text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
            onClick={() => deleteHotel(value, original.image)}
          >
            Delete
          </a>
          <br />
          <br />
          <a
            className=" bg-slate-500 h-10 text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
            onClick={() => {
              setRooms(value);
              setImages(original.image);
              setShowButton(true);
            }}
          >
            Edit
          </a>
          <br />
          <br />
        </div>
      ),
    },
  ];

  return (
    <>
      <AdminHeader />
      {showButton && <AddHotel hotelId={rooms} image={images} />}
      <div className="flex justify-center items-center">
        <button
          className=" bg-slate-500 text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
          onClick={() => setShowButton(true)}
        >
          Add More Hotels
        </button>
      </div>
      <div className="m-auto border border-black bg-white gap-2rem rounded-lg p-3 max-w-5xl mx-auto my-10 ">
        <div>
          <Table columns={columns} data={data} />
        </div>
      </div>
      {viewRoom && <ViewRoom hotelId={rooms} />}
    </>
  );
};

export default adminHotel;
