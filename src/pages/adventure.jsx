import React, { useState } from "react";
import { useGetAdventuresQuery } from "@/api/api";
import { useNavigate } from "react-router-dom";
import AdventureReservation from "@/components/Adventure/AdventureReservation";

const adventure = () => {
  const [reservation, setReservation] = useState("");
  const [event, setEvent] = useState("");
  const {
    data: { adventures: adventures } = {},
    error,
    isLoading,
  } = useGetAdventuresQuery();
  const navigate = useNavigate();

  const bookAdventure = (eventName) => {
    setReservation(true);
    setEvent(eventName);
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
                    {events.map((event, index) => (
                      <div key={index}>
                        <div>
                          <span>Event Name: {event.eventName}</span>
                          <br />
                          <span>Price: {event.price}</span>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => bookAdventure(events.eventName)}>
                      Book Adventure
                    </button>
                  </div>
                </div>
              )
            )
          )}
          {reservation && <AdventureReservation event={event} />}
        </div>
      )}
    </div>
  );
};

export default adventure;
