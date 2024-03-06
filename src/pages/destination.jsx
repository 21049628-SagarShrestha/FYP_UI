import React from "react";
import { useGetDestinationsQuery } from "@/api/api";
import { useNavigate } from "react-router-dom";
import "@/assets/Styles/destination.css"
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  
  return (
   
    <div className="v-main">
   
   {destinations &&
          destinations.map((i) => {
            return (
          <div className="v-inner">
            <div className="v-first">
              <img src={i.image}
                  // src={`${api_port}images/hotels/${i.image}`}
                  alt={i.name} />

              
            </div>
            <div className="v-second">
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
