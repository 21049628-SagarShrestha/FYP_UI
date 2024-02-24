// ExampleComponent.js
import React, { useState } from "react";
import { useGetRoomsQuery, useDeleteRoomsMutation } from "@/api/api";
import AddRoom from "@/components/Hotel/AddRoom";
import { deleteFile } from "@/utils/firebaseStorage";

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
              <table>
                <thead>
                  <tr>
                    <td>Room Number</td>
                    <td>Room Type</td>
                    <td>Price Per Night</td>
                    <td>Availability</td>
                    <td>Facilities</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {filteredRooms &&
                    filteredRooms.map(
                      ({
                        _id,
                        image,
                        roomNumber,
                        roomType,
                        pricePerNight,
                        availability,
                        facilities,
                      }) => {
                        return (
                          <tr key={_id}>
                            <td>
                              <img
                                src={image}
                                alt={roomNumber}
                                height={90}
                                width={90}
                              />
                            </td>
                            <td>{roomNumber}</td>
                            <td>{roomType}</td>
                            <td>{pricePerNight}</td>
                            <td>{availability}</td>
                            <td>{facilities}</td>

                            <td>
                              <a onClick={() => deleteRoom(_id, image)}>
                                Delete Room
                              </a>
                              <br />
                              <a
                                onClick={() => {
                                  setRoomsId(_id);
                                  setImages(image);
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
            )}
          </div>
        )}
      </div>
      {showViewButton && <AddRoom hotelId={rooms} />}
    </div>
  );
};
export default ViewRoom;
