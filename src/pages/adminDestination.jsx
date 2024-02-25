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
        <>
          <a onClick={() => deleteDestination(value, original.image)}>Delete</a>
          <br />
          <a
            onClick={() => {
              setDestination(value);
              setImages(original.image);
              setShowButton(true);
            }}
          >
            Edit
          </a>
        </>
      ),
    },
  ];
  return (
    <div>
      <h1>Destinations</h1>
      {showButton && (
        <AddDestination destinationId={destination} image={images} />
      )}
      <button onClick={() => setShowButton(true)}> Add More Destination</button>
      <div>
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};
export default adminDestination;
