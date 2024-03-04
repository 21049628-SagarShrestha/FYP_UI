// ExampleComponent.js
import React, { useState } from "react";
import { useGetFlightsQuery } from "@/api/api";
import Table from "../components/Common/Table";

const adminTransport = () => {
  const {
    data: { Flights: flights } = {},
    error,
    isLoading,
  } = useGetFlightsQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching Flights</p>;
  }

  const data = flights || [];

  // Add an index to each flight,
  const indexedData = data.map((flight, index) => ({
    ...flight,
    index: index + 1,
  }));

  const columns = [
    {
      Header: "Index",
      accessor: "index",
    },
    {
      Header: "Flight Date",
      accessor: "flightDate",
    },
    {
      Header: "Airline",
      accessor: "airline",
    },
    {
      Header: "Departure Airport",
      accessor: "departure_airport",
    },
    {
      Header: "Arrival Airport",
      accessor: "arrival_airport",
    },
    {
      Header: "Departure Time",
      accessor: "departure_time",
    },
    {
      Header: "Flight Duration",
      accessor: "flight_time",
    },
    {
      Header: "Price",
      accessor: "price",
    },
  ];

  return (
    <div>
      <Table columns={columns} data={indexedData} />
    </div>
  );
};

export default adminTransport;
