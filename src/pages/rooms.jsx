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

  const filteredRooms = rooms.filter((room) => room.hotelId === hotelIdFromUrl);

  const handleBookRoom = (price, room_num) => {
    setReservation(true);
    setPrices(price);
    setRoom(room_num);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {filteredRooms.length === 0 ? (
            <p>No rooms available for the selected hotel.</p>
          ) : (
            filteredRooms.map((x) => (
              <div key={x._id}>
                <img src={x.image} alt={x.roomNumber} height={90} width={90} />
                <div>
                  {x.roomNumber}
                  {x.roomType}
                  {x.pricePerNight}
                  {x.availability}
                  {x.facilities}
                  <button
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
          {reservation && <Reservation price={prices} room_num={room} />}
        </div>
      )}
    </div>
  );
};

export default Rooms;
export { PriceContext };
