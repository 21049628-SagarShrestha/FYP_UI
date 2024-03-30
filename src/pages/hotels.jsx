import React from "react";
import { useGetHotelsQuery, useGetRoomReservationsQuery } from "@/api/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const hotels = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [recommendedHotels, setRecommendedHotels] = useState([]);
  let { data: { Hotels: hotels } = {}, error, isLoading } = useGetHotelsQuery();
  const { data: { RoomReservation: reserves } = {} } =
    useGetRoomReservationsQuery();

  console.log(reserves, "rerere");
  const RecommendHotel = () => {
    // Filter previous reservations based on the current user's email
    const prevReserve = reserves.filter(
      (reserve) => reserve.user === currentUser.email
    );
    console.log(prevReserve, "re");

    // Extract locations from previous reservations
    const prevLocations = prevReserve.map((reserve) => reserve.location);
    console.log(prevLocations, "loc");
    const recommendedHotelo = hotels.filter((hotel) =>
      prevLocations.includes(hotel.location)
    );
    setRecommendedHotels(recommendedHotelo);
  };

  console.log(recommendedHotels, "oooooo");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching hotels</p>;
  }
  return (
    <div className="d-main">
      <button onClick={() => RecommendHotel()}> Recommend</button>
      {(hotels && hotels.length > 0) ||
      (recommendedHotels && recommendedHotels.length > 0) ? (
        (recommendedHotels && recommendedHotels.length > 0
          ? recommendedHotels
          : hotels
        ).map((i) => {
          return (
            <div key={i._id} className="d-inner">
              <div className="d-first">
                <img
                  src={i.image}
                  // src={`${api_port}images/hotels/${i.image}`}
                  alt={i.name}
                />
              </div>
              <div className="d-second">
                <h3 className="text-xl font-bold text-center">{i.name}</h3>
                <br />

                <p>
                  <b>Location: </b>
                  {i.location}
                </p>
                <p>
                  <b>Room: </b>
                  {i.room}
                </p>

                <p>
                  <b>Facilities: </b> {i.facilities}
                </p>
                <p>
                  <b>contact: </b> {i.contact}
                </p>
                <p>
                  <b>Rating: </b> {i.rating}
                </p>
                <p>
                  <b>Description: </b> {i.description}
                </p>
                <br />
                <button
                  className=" bg-black text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
                  onClick={() =>
                    navigate(
                      `/rooms?hotelId=${i._id}&&facilities=${i.facilities}`
                    )
                  }
                >
                  View Rooms
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>Loading hotels...</p>
      )}
    </div>
  );
};

export default hotels;
