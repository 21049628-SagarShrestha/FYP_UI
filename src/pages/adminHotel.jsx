// ExampleComponent.js
import React, { useState } from "react";
import { useGetHotelsQuery, useDeleteHotelsMutation } from "@/api/api";
import AddHotel from "@/components/Hotel/AddHotel";
import AddRoom from "@/components/Hotel/AddRoom";
import { deleteFile } from "../utils/firebaseStorage";

const adminHotel = () => {
  const {
    data: { Hotels: hotels } = {},
    error,
    isLoading,
  } = useGetHotelsQuery();
  const [rooms, setRooms] = useState("");
  const [images, setImages] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [showViewButton, setShowViewButton] = useState(false);
  const [deleteHotels] = useDeleteHotelsMutation();
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
      console.log(deletePromises, "Pro");
      await Promise.all(deletePromises);
      await deleteHotels(id);
    } catch (error) {
      console.error(`Error deleting Hotel:`, error);
    }
  };

  return (
    <div>
      {showButton && <AddHotel hotelId={rooms} image={images} />}
      <button onClick={() => setShowButton(true)}>Add More Hotels</button>
      <div>
        <table>
          <thead>
            <tr>
              <td>Image</td>
              <td>Name</td>
              <td>Location</td>
              <td>Description</td>
              <td>Room</td>
              <td>Facilities</td>
              <td>Rating</td>
              <td>Contact</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {hotels &&
              hotels.map(
                ({
                  _id,
                  image,
                  name,
                  location,
                  description,
                  room,
                  facilities,
                  rating,
                  contact,
                }) => {
                  return (
                    <tr key={_id}>
                      <td>
                        <img src={image} alt={name} height={90} width={90} />
                      </td>
                      <td>{name}</td>
                      <td>{location}</td>
                      <td>{description}</td>
                      <td>{room}</td>
                      <td>{facilities}</td>
                      <td>{rating}</td>
                      <td>{contact}</td>
                      <td>
                        <a
                          onClick={() => {
                            setShowViewButton(true);
                            setRooms(_id);
                            setImages(image);
                          }}
                        >
                          Add Room
                        </a>
                        <br />
                        <a onClick={() => deleteHotel(_id, image)}>
                          Delete Hotel
                        </a>
                        <br />
                        <a
                          onClick={() => {
                            setRooms(_id);
                            setImages(image);
                            setShowButton(true);
                          }}
                        >
                          Edit Hotel
                        </a>
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </div>
      {showViewButton && <AddRoom hotelId={rooms} />}
    </div>
  );
};
export default adminHotel;
