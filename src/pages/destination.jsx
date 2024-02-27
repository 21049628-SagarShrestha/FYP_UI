import React from "react";
import { useGetDestinationsQuery } from "@/api/api";
import { useNavigate } from "react-router-dom";

const hotels = () => {
  const {
    data: { destinations: destinations } = {},
    error,
    isLoading,
  } = useGetDestinationsQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching Destinations</p>;
  }
  return (
    <div>
      <div>
        {destinations &&
          destinations.map((i) => {
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
                  {i.rating}
                  {i.placesToVisit}
                  {i.cost}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default hotels;
