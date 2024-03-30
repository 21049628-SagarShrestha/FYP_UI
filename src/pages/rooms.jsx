import React, { createContext, useState } from "react";
import { useGetRoomsQuery } from "../api/api";
import Reservation from "@/components/Hotel/Reservation";

const PriceContext = createContext();

const Rooms = () => {
  const { data: response, isLoading } = useGetRoomsQuery();
  const rooms = response?.Rooms || [];
  const [reservation, setReservation] = useState(false);
  const [prices, setPrices] = useState("");
  const [room, setRoom] = useState("");

  const searchParams = new URLSearchParams(window.location.search);
  const hotelIdFromUrl = searchParams.get("hotelId");
  const hotelFacilities = searchParams.get("facilities");
  const filteredRooms = rooms.filter(
    (room) => room.hotelId === hotelIdFromUrl && room.availability === true
  );

  const handleBookRoom = (price, room_num) => {
    setReservation(true);
    setPrices(price);
    setRoom(room_num);
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="d-main">
          {reservation && (
            <Reservation
              price={prices}
              room_num={room}
              facilities={hotelFacilities}
            />
          )}
          {filteredRooms.length === 0 ? (
            <p>No rooms available for the selected hotel.</p>
          ) : (
            filteredRooms.map((x) => (
              <div key={x._id} className="d-inner">
                <div className="d-first">
                  <img src={x.image} alt={x.roomNumber} />
                </div>
                <div className="d-second">
                  <h3 className="text-xl font-bold text-center">
                    {x.roomType}
                  </h3>
                  <br />
                  <p>
                    <b>RoomNumber: </b>
                    {x.roomNumber}
                  </p>
                  <p>
                    <b>Price/Night: </b>
                    {x.pricePerNight}
                  </p>

                  {x.availability}

                  <p>
                    <b>Facilities: </b>
                    {x.facilities}
                  </p>
                  <br />

                  <button
                    className=" bg-black text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
                    onClick={() =>
                      handleBookRoom(x.pricePerNight, x.roomNumber)
                    }
                  >
                    Book Room
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default Rooms;
export { PriceContext };
