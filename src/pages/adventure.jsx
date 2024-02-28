import React, { useState } from "react";
import { useGetAdventuresQuery } from "@/api/api";
import { useNavigate } from "react-router-dom";
import AdventureReservation from "@/components/Adventure/AdventureReservation";

const adventure = () => {
  const [reservation, setReservation] = useState("");
  const [events, setEvents] = useState("");
  const {
    data: { adventures: adventures } = {},
    error,
    isLoading,
  } = useGetAdventuresQuery();
  const navigate = useNavigate();

  const bookAdventure = (events) => {
    setReservation(true);
    setEvents(events);
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching adventure</p>;
  }
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {adventures.length === 0 ? (
            <p>No Adventure available .</p>
          ) : (
            adventures.map(
              ({ _id, image, name, location, description, events }) => (
                <div key={_id}>
                  <img src={image} alt={name} height={90} width={90} />
                  <div>
                    {name}
                    {location}
                    {description}
                    <div style={{ whiteSpace: "pre-line" }}>
                      {events.map((event) => event.eventName).join("\n")}
                    </div>
                    <div style={{ whiteSpace: "pre-line" }}>
                      {events.map((event) => event.price).join("\n")}
                    </div>
                    <button onClick={() => bookAdventure(events)}>
                      Book Adventure
                    </button>
                  </div>
                </div>
              )
            )
          )}
          {reservation && <AdventureReservation events={events} />}
        </div>
      )}
    </div>
  );
};

export default adventure;
