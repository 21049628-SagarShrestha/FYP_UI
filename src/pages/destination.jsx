import React from "react";
import { useGetDestinationsQuery } from "@/api/api";
import { useNavigate } from "react-router-dom";
import "@/assets/Styles/destination.css";
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
    <div className="d-main">
      {destinations &&
        destinations.map((i) => {
          return (
            <div key={i._id} className="d-inner">
              <div className="d-first">
                <img src={i.image} alt={i.name} />
              </div>
              <div className="d-second">
                <h3 className="text-xl font-bold text-center">{i.name}</h3>
                <br />

                <p>
                  <b>Location: </b>
                  {i.location}
                </p>

                <p>
                  <b>Places: </b> {i.placesToVisit}
                </p>

                <p>
                  <b>Rating: </b> {i.rating}
                </p>

                <p>
                  <b>Price: </b> {i.cost}
                </p>
                <p>
                  <b>Description: </b> {i.description}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default hotels;
