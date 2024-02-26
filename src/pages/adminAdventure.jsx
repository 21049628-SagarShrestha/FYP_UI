// ExampleComponent.js
import React, { useState } from "react";
import { useGetAdventureQuery, useDeleteAdventuresMutation } from "@/api/api";
import AddAdventure from "@/components/AddAdventure";
import { deleteFile } from "@/utils/firebaseStorage";
import Table from "@/components/Common/Table";

const adminAdventure = () => {
  const {
    data: { adventures: adventures } = {},
    error,
    isLoading,
  } = useGetAdventureQuery();

  const [adventure, setAdventure] = useState("");
  const [images, setImages] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [deleteAdventures] = useDeleteAdventuresMutation();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching Adventure</p>;
  }

  const deleteAdventure = async (id, image) => {
    try {
      const deletePromises = image.map(async (x) => {
        return deleteFile(x);
      });
      await Promise.all(deletePromises);
      await deleteAdventures(id);
    } catch (error) {
      console.error(`Error deleting Adventure:`, error);
    }
  };

  const data = adventures || [];
  console.log(data, "dat");
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
      Header: "Adventure Type",
      accessor: "adventureType",
    },
    {
      Header: "Action",
      accessor: "_id",
      Cell: ({ cell: { value }, row: { original } }) => (
        <>
          <a onClick={() => deleteAdventure(value, original.image)}>
            Delete Adventure
          </a>
          <br />
          <a
            onClick={() => {
              setAdventure(value);
              setImages(original.image);
              setShowButton(true);
            }}
          >
            Edit Adventure
          </a>
        </>
      ),
    },
  ];

  return (
    <div>
      {showButton && <AddAdventure adventureId={adventure} image={images} />}
      <button onClick={() => setShowButton(true)}>Add More Adventure</button>
      <div>
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default adminAdventure;
