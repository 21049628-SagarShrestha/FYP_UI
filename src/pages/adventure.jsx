import React, { useState } from "react";
import { useGetAdventuresQuery } from "@/api/api";
import { useNavigate } from "react-router-dom";
import AdventureReservation from "@/components/Adventure/AdventureReservation";
import "@/assets/Styles/adventure.css";
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
    <div className="a-main">
      {reservation && <AdventureReservation events={events} />}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {adventures.length === 0 ? (
            <p>No Adventure available .</p>
          ) : (
            adventures.map(
              ({ _id, image, name, location, description, events }) => (
                <div className="a-inner" key={_id}>
                  <div className="a-first">
                    <img src={image} alt={name} />
                    <div className="text-center my-6">
                      <button
                        className=" bg-black text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
                        onClick={() => bookAdventure(events)}
                      >
                        Book Adventure
                      </button>
                    </div>
                  </div>

                  <div className="a-second">
                    <h3 className="font-bold text-center">{location}</h3>
                    <br />

                    <p>
                      <b>Company:</b> {name}
                    </p>

                    <p>
                      <b>Location:</b> {location}
                    </p>
                    <p>
                      <b>Description:</b> {description}
                    </p>
                    <div className="flex gap-4 ">
                      <div
                        className="font-bold"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        Events <br />
                        {events.map((event) => event.eventName).join("\n")}
                      </div>
                      <div
                        className="font-bold"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        Price <br />
                        {events.map((event) => event.price).join("\n")}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )
          )}
        </div>
      )}
    </div>
  );
};

export default adventure;
