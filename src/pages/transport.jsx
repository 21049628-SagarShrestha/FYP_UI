import React, { useState } from "react";
import { useGetFlightsQuery } from "@/api/api";
import TransportReservation from "../components/Transport/TransportReservation";
import { useEffect } from "react";

const Transport = () => {
  const [reservationDetails, setReservationDetails] = useState(null);
  const [searchDate, setSearchDate] = useState(""); // State to store the input date
  const [flyDate, setFlyDate] = useState(""); // State to store the input date
  const {
    data: { Flights: flights } = {},
    error,
    isLoading,
  } = useGetFlightsQuery();
  const pres = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (searchDate) {
      setFlyDate(searchDate);
    } else {
      setFlyDate(pres);
    }
  }, [searchDate, pres]);
  const newFlights = flights?.map((flight) => ({
    ...flight,
    flightDate: flight.flightDate.split("T")[0],
  }));

  const filteredFlights = newFlights?.filter(
    (flight) => flight.flightDate === flyDate
  );

  const bookFlight = (flightDetails) => {
    setReservationDetails(flightDetails);
  };

  const handleSearchDateChange = (event) => {
    setSearchDate(event.target.value);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching Transport</p>;
  }

  return (
    <div>
      {reservationDetails && <TransportReservation {...reservationDetails} />}

      <div>
        <label htmlFor="searchDate">Search Flights by Date:</label>
        <input
          type="date"
          id="searchDate"
          min={new Date().toISOString().split("T")[0]} // Set min attribute to current date
          value={searchDate}
          onChange={handleSearchDateChange}
        />
      </div>

      {filteredFlights.length === 0 ? (
        <p>No flights available for the selected date.</p>
      ) : (
        <div>
          {filteredFlights.map(
            ({
              _id,
              flightDate,
              airline,
              departure_airport,
              arrival_airport,
              departure_time,
              flight_time,
              price,
            }) => (
              <div key={_id}>
                <div>
                  {flightDate}
                  {airline}
                  {arrival_airport}
                  {departure_time}
                  {flight_time}
                  {price}
                  {departure_airport}

                  <button
                    onClick={() =>
                      bookFlight({
                        flightDate,
                        airline,
                        arrival_airport,
                        departure_time,
                        flight_time,
                        price,
                        departure_airport,
                      })
                    }
                  >
                    Book Flight
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Transport;
