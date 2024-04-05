import React, { useState } from "react";
import {
  useGetHotelsQuery,
  useGetDestinationsQuery,
  useGetAdventuresQuery,
} from "@/api/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
      filteredData = hotels.filter((hotel) =>
        hotel.name.toLowerCase().includes(searchStatus.toLowerCase())
      );
      break;
    case "destinations":
      filteredData = destinations.filter((destination) =>
        destination.name.toLowerCase().includes(searchStatus.toLowerCase())
      );
      break;
    case "adventures":
      filteredData = adventures.filter((adventure) =>
        adventure.name.toLowerCase().includes(searchStatus.toLowerCase())
      );
      break;
    default:
      // Filter through all data if searchStatus is not recognized
      hotels.forEach((hotel) => {
        if (hotel.name.toLowerCase().includes(searchStatus.toLowerCase())) {
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
        if (adventure.name.toLowerCase().includes(searchStatus.toLowerCase())) {
          filteredData.push(adventure);
        }
      });
      break;
  }
  console.log(filteredData, "data");
  return (
    <div className="d-main">
      {filteredData.map((item, index) => (
        <div key={index}>
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Index;
