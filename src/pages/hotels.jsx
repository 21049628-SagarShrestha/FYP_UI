import React from "react";
import { useGetHotelsQuery } from "@/api/api";
import { useNavigate } from "react-router-dom";

const hotels = () => {
  const {
    data: { Hotels: hotels } = {},
    error,
    isLoading,
  } = useGetHotelsQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching hotels</p>;
  }
  return (
    <div>
      <div>
        {hotels &&
          hotels.map((i) => {
            return (
              <div key={i._id}>
                <img
                  src={i.image}
                  // src={`${api_port}images/hotels/${i.image}`}
                  alt={i.name}
                  height={90}
                  width={90}
                />
                <div>
                  {i.name}
                  {i.location}
                  {i.description}
                  {i.room}
                  {i.facilities}
                  {i.rating}
                  {i.contact}
                  <button onClick={() => navigate(`/rooms?hotelId=${i._id}`)}>
                    View Rooms
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default hotels;
