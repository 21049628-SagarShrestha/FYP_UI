// ExampleComponent.js
import React, { useState } from "react";
import { useGetHotelsQuery, useDeleteHotelsMutation } from "@/api/api";
import AddHotel from "@/components/Hotel/AddHotel";
import AddRoom from "@/components/Hotel/AddRoom";
import { getStorage, ref, deleteObject } from "firebase/storage";

const adminHotel = () => {
  const storage = getStorage();
  const {
    data: { Hotels: hotels } = {},
    error,
    isLoading,
  } = useGetHotelsQuery();
  const [rooms, setRooms] = useState("");
  const [showButton, setShowButton] = useState(false);
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
        const fileRef = ref(storage, x);

        try {
          await deleteObject(fileRef);
          console.log(`File ${x} deleted successfully`);
        } catch (error) {}
      });
      await Promise.all(deletePromises);
      await deleteHotels(id);
    } catch (error) {
      console.error(`Error deleting Hotel:`, error);
    }
  };

  return (
    <div>
      {showButton && <AddHotel hotelId={rooms} />}
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
                        <a onClick={() => setRooms(_id)}>Add Room</a>
                        <br />
                        <a onClick={() => deleteHotel(_id, image)}>
                          Delete Room
                        </a>
                        <br />
                        <a
                          onClick={() => {
                            setRooms(_id);
                            setShowButton(true);
                          }}
                        >
                          Edit Room
                        </a>
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </div>
      {rooms && <AddRoom hotelId={rooms} />}
    </div>
  );
};
export default adminHotel;
