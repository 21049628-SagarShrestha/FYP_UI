import React, { useState } from "react";
import {
  useGetHotelsQuery,
  useGetDestinationsQuery,
  useGetAdventuresQuery,
} from "@/api/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "@/assets/styles/home.css";

const Index = () => {
  const { searchStatus } = useSelector((state) => state.search);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("hotels"); // Default filter is "hotels"
  const {
    data: { Hotels: hotels } = {},
    error: hotelsError,
    isLoading: hotelsLoading,
  } = useGetHotelsQuery();
  const {
    data: { destinations: destinations } = {},
    error: destinationsError,
    isLoading: destinationsLoading,
  } = useGetDestinationsQuery();
  const {
    data: { adventures: adventures } = {},
    error: adventuresError,
    isLoading: adventuresLoading,
  } = useGetAdventuresQuery();

  console.log(hotels, "hotel");
  console.log(destinations, "dset");
  console.log(adventures, "adv");

  if (hotelsLoading || destinationsLoading || adventuresLoading) {
    return <p>Loading...</p>;
  }

  if (hotelsError || destinationsError || adventuresError) {
    return <p>Error fetching data</p>;
  }

  // Combine all data based on searchStatus
  let filteredData = [];

  switch (searchStatus) {
    case "hotels":
      filteredData = hotels.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(searchStatus.toLowerCase()) ||
          hotel.location.toLowerCase().includes(searchStatus.toLowerCase())
      );
      break;
    case "destinations":
      filteredData = destinations.filter((destination) =>
        destination.name.toLowerCase().includes(searchStatus.toLowerCase())
      );
      break;
    case "adventures":
      filteredData = adventures.filter(
        (adventure) =>
          adventure.name.toLowerCase().includes(searchStatus.toLowerCase()) ||
          adventure.location.toLowerCase().includes(searchStatus.toLowerCase())
      );
      break;
    default:
      // Filter through all data if searchStatus is not recognized
      hotels.forEach((hotel) => {
        if (
          hotel.name.toLowerCase().includes(searchStatus.toLowerCase()) ||
          hotel.location.toLowerCase().includes(searchStatus.toLowerCase())
        ) {
          filteredData.push(hotel);
        }
      });
      destinations.forEach((destination) => {
        if (
          destination.name.toLowerCase().includes(searchStatus.toLowerCase())
        ) {
          filteredData.push(destination);
        }
      });
      adventures.forEach((adventure) => {
        if (
          adventure.name.toLowerCase().includes(searchStatus.toLowerCase()) ||
          adventure.location.toLowerCase().includes(searchStatus.toLowerCase())
        ) {
          filteredData.push(adventure);
        }
      });
      break;
  }

  console.log(filteredData, "data");
  return (
    <div className="d-main">
      {filteredData.map((item, index) => (
        <div key={index} className="item-container">
          <p className="item-name">{item.name}</p>
          {item.location && (
            <p className="item-location">Location: {item.location}</p>
          )}
          {item.image && (
            <div className="item-image">
              {item.image.map((imageUrl, index) => (
                <img key={index} src={imageUrl} alt={`Image ${index}`} />
              ))}
            </div>
          )}
          {item.contact && (
            <p className="item-contact">Contact: {item.contact}</p>
          )}
          {item.cost && <p className="item-description">Cost: {item.cost}</p>}
          {item.language && (
            <p className="item-description">Language: {item.language}</p>
          )}
          {item.weatherInfo && (
            <p className="item-description">Weather Info: {item.weatherInfo}</p>
          )}
          {item.rating && (
            <p className="item-description">Rating: {item.rating}</p>
          )}
          {item.description && (
            <p className="item-description">{item.description}</p>
          )}
          {item.facilities && (
            <ul className="item-facilities">
              Facilities:
              {item.facilities.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>
          )}
          {item.placesToVisit && (
            <ul className="item-facilities">
              Places To Visit:
              {item.placesToVisit.map((place, index) => (
                <li key={index}>{place}</li>
              ))}
            </ul>
          )}
          {item.review && (
            <ul className="item-facilities">
              Review:
              {item.review.map((review, index) => (
                <li key={index}>{review}</li>
              ))}
            </ul>
          )}

          {item.events && (
            <div className="flex gap-4 ">
              <div style={{ whiteSpace: "pre-line" }}>
                <span className="font-bold">Events</span> <br />
                {item.events.map((event) => event.eventName).join("\n")}
              </div>
              <div style={{ whiteSpace: "pre-line" }}>
                <span className="font-bold">Price</span> <br />
                {item.events.map((event) => event.price).join("\n")}
              </div>
            </div>
          )}

          {item.room && (
            <ul className="item-facilities">
              Room:
              {item.room.map((room, index) => (
                <li key={index}>{room}</li>
              ))}
            </ul>
          )}
          {item.rating && <p className="item-rating">Rating: {item.rating}</p>}
        </div>
      ))}
    </div>
  );
};

export default Index;
