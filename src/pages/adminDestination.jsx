// ExampleComponent.js
import React, { useState } from "react";
import {
  useGetDestinationsQuery,
  useDeleteDestinationsMutation,
} from "@/api/api";
import AddDestination from "@/components/AddDestination";
import { deleteFile } from "../utils/firebaseStorage";
import Table from "../components/Common/Table";

const adminDestination = () => {
  const {
    data: { destinations: destinations } = {},
    error,
    isLoading,
  } = useGetDestinationsQuery();
  const [deleteDestinations] = useDeleteDestinationsMutation();
  const [showButton, setShowButton] = useState(false);
  const [destination, setDestination] = useState("");
  const [images, setImages] = useState("");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching hotels</p>;
  }

  const deleteDestination = async (id, image) => {
    try {
      const deletePromises = image.map(async (x) => {
        return deleteFile(x);
      });
      await Promise.all(deletePromises);
      await deleteDestinations(id);
    } catch (error) {
      console.error(`Error deleting Destination:`, error);
    }
  };

  const data = destinations || [];
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
      Header: "Rating",
      accessor: "rating",
    },
    {
      Header: "Places To Visito",
      accessor: "placesToVisit",
    },
    {
      Header: "Cost",
      accessor: "cost",
    },
    {
      Header: "Action",
      accessor: "_id",
      Cell: ({ cell: { value }, row: { original } }) => (
        <div className="flex gap-2">
          <a
            className=" bg-red-500 h-9 text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
            onClick={() => deleteDestination(value, original.image)}
          >
            Delete
          </a>
          <br />
          <a
            className=" bg-slate-500 h-9 text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
            onClick={() => {
              setDestination(value);
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
      <h1 className="text-bold">Destinations</h1>
      {showButton && (
        <AddDestination destinationId={destination} image={images} />
      )}
      <div className="flex justify-center items-center">
        <button
          className=" bg-slate-500 text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
          onClick={() => setShowButton(true)}
        >
          Add More Destination
        </button>
      </div>
      <div className="m-auto border border-black bg-white gap-2rem rounded-lg p-3 max-w-8xl mx-auto my-10 ">
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};
export default adminDestination;
