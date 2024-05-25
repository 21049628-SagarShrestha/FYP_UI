import React, { useState } from "react";
import { useGetFlightsQuery } from "@/api/api";
import TransportReservation from "../components/Transport/TransportReservation";
import { useEffect } from "react";
import "../assets/styles/transport.css";
import Header from "../components/Common/Header";

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
    <>
      <Header />
      <div className="flight-container">
        {reservationDetails && <TransportReservation {...reservationDetails} />}

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
                <div key={_id} className="flight-card">
                  <div className="flight-details">
                    <div>
                      <strong>Date:</strong> {flightDate}
                    </div>
                    <div>
                      <strong>Airline:</strong> {airline}
                    </div>
                    <div>
                      <strong>Departure Airport:</strong> {departure_airport}
                    </div>
                    <div>
                      <strong>Arrival Airport:</strong> {arrival_airport}
                    </div>
                    <div>
                      <strong>Departure Time:</strong> {departure_time}
                    </div>
                    <div>
                      <strong>Flight Time:</strong> {flight_time}
                    </div>
                    <div>
                      <strong>Price:</strong> {price}
                    </div>

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
    </>
  );
};

export default Transport;
