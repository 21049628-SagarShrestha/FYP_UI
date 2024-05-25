import React, { useState } from "react";
import {
  useGetHotelsQuery,
  useGetDestinationsQuery,
  useGetAdventuresQuery,
} from "@/api/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "@/assets/styles/home.css";
import Header from "../components/Common/Header";

const Index = () => {
  const { searchStatus } = useSelector((state) => state.search);
  const navigate = useNavigate();
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

  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser, "home");

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
          adventure.location
            .toLowerCase()
            .includes(searchStatus.toLowerCase()) ||
          (adventure.events &&
            adventure.events.some((event) =>
              event.eventName.toLowerCase().includes(searchStatus.toLowerCase())
            ))
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
          adventure.location
            .toLowerCase()
            .includes(searchStatus.toLowerCase()) ||
          (adventure.events &&
            adventure.events.some((event) =>
              event.eventName.toLowerCase().includes(searchStatus.toLowerCase())
            ))
        ) {
          filteredData.push(adventure);
        }
      });
      break;
  }

  return (
    <>
      <Header />
      <div className="d-main">
        {filteredData.map((item, index) => (
          <div key={index} className="d-inner">
            {item.image && (
              <div className="d-first">
                {item.image.map((imageUrl, index) => (
                  <img key={index} src={imageUrl} alt={`Image ${index}`} />
                ))}
              </div>
            )}
            <div className="d-second">
              <p className="text-xl font-bold text-center">{item.name}</p>
              {item.location && (
                <p className="item-location">
                  <b>Location:</b> {item.location}
                </p>
              )}
              {item.contact && (
                <p className="item-contact">
                  <b>Contact:</b> {item.contact}
                </p>
              )}
              {item.cost && (
                <p className="item-description">
                  <b>Cost:</b> {item.cost}
                </p>
              )}
              {item.language && (
                <p className="item-description">
                  <b>Language:</b> {item.language}
                </p>
              )}
              {item.weatherInfo && (
                <p className="item-description">
                  <b>Weather Info:</b> {item.weatherInfo}
                </p>
              )}
              {item.rating && (
                <p className="item-description">
                  <b>Rating:</b>
                  {item.rating}
                </p>
              )}
              {item.description && (
                <p className="item-description">{item.description}</p>
              )}
              {item.facilities && (
                <ul className="item-facilities">
                  <b> Facilities:</b>
                  {item.facilities.map((facility, index) => (
                    <li key={index}>{facility}</li>
                  ))}
                </ul>
              )}
              {item.placesToVisit && (
                <ul className="item-facilities">
                  <b>Places To Visit:</b>
                  {item.placesToVisit.map((place, index) => (
                    <li key={index}>{place}</li>
                  ))}
                </ul>
              )}
              {item.review && (
                <ul className="item-facilities">
                  <b>Review: </b>
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
                  <b>Room:</b>
                  {item.room.map((room, index) => (
                    <li key={index}>{room}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Index;
