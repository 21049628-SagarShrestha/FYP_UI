// ExampleComponent.js
import React, { useState } from "react";
import { useGetAdventuresQuery, useDeleteAdventuresMutation } from "@/api/api";
import AddAdventure from "@/components/Adventure/AddAdventure";
import { deleteFile } from "@/utils/firebaseStorage";
import Table from "@/components/Common/Table";

const adminAdventure = () => {
  const {
    data: { adventures: adventures } = {},
    error,
    isLoading,
  } = useGetAdventuresQuery();

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
  console.log(data);
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
      Header: "Events",
      accessor: "events",
      columns: [
        {
          Header: "Event Name",
          accessor: (data) => (
            <div style={{ whiteSpace: "pre-line" }}>
              {data.events.map((event) => event.eventName).join("\n")}
            </div>
          ),
        },
        {
          Header: "Price",
          accessor: (data) => (
            <div style={{ whiteSpace: "pre-line" }}>
              {data.events.map((event) => event.price).join("\n")}
            </div>
          ),
        },
      ],
    },

    {
      Header: "Action",
      accessor: "_id",
      Cell: ({ cell: { value }, row: { original } }) => (
        <>
          <a
            className=" bg-red-500 text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
            onClick={() => deleteAdventure(value, original.image)}
          >
            Delete Adventure
          </a>
          <br />
          <br />
          <a
            className=" bg-slate-500 text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
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
    <>
      {showButton && <AddAdventure adventureId={adventure} image={images} />}
      <button
        className=" bg-slate-500 text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
        onClick={() => setShowButton(true)}
      >
        Add More Adventure
      </button>
      <div className="m-auto border border-black bg-white gap-4 rounded-lg p-3 max-w-2xl mx-auto my-10 ">
        <div>
          <Table columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

export default adminAdventure;
