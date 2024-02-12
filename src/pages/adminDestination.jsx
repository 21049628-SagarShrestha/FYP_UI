// ExampleComponent.js
import React from "react";
import { useGetDestinationsQuery } from "../api/api";

const adminDestination = () => {
  const { data: response, error, isLoading } = useGetDestinationsQuery();
  const destinations = response?.destinations || [];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching hotels</p>;
  }

  return (
    <div>
      <h1>Destinations</h1>
      <ul>
        {destinations &&
          destinations.map((x) => (
            <li key={x._id}>
              {x.name}
              {x.location}
            </li>
          ))}
      </ul>
    </div>
  );
};
export default adminDestination;
