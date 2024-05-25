import React, { useState } from "react";
import {
  useGetAdventuresQuery,
  useGetAdventureReservationsQuery,
} from "@/api/api";
import { useNavigate } from "react-router-dom";
import AdventureReservation from "@/components/Adventure/AdventureReservation";
import "@/assets/Styles/adventure.css";
import Review from "../components/Review";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../components/Common/Header";

const adventure = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [reservation, setReservation] = useState("");
  const [events, setEvents] = useState("");
  const [adventureId, setAdventureId] = useState(null);
  const [adventureBookId, setAdventureBookId] = useState(null);
  const [review, setReview] = useState(false);

  const {
    data: { adventures: adventures } = {},
    error,
    isLoading,
  } = useGetAdventuresQuery();
  const { data: { AdventureReservation: reserves } = {} } =
    useGetAdventureReservationsQuery();

  const prevReserve = reserves?.filter(
    (reserve) => reserve.user === currentUser.email
  );

  const bookAdventure = (events, _id) => {
    setReservation(true);
    setAdventureBookId(_id);
    setEvents(events);
  };

  useEffect(() => {
    if (adventureId !== null) {
      setReview(true);
    }
  }, [adventureId]);

  const handleReview = (adventureId) => {
    let hasReviewForAdventure = false;

    prevReserve.forEach((reserve) => {
      if (reserve.adventureId === adventureId) {
        hasReviewForAdventure = true;
        return; // Exit the loop early if a review for this hotel is found
      }
    });

    if (hasReviewForAdventure) {
      setAdventureId(adventureId);
      setReview(true);
    } else {
      toast.error("Please book to add review!", {
        position: "top-right",
      });
    }
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching adventure</p>;
  }
  const handleCloseBooking = () => {
    setReview(false);
  };
  return (
    <>
      <Header />

      {review && (
        <Review adventureId={adventureId} onClose={handleCloseBooking} />
      )}
      {reservation && (
        <AdventureReservation
          events={events}
          adventureBookId={adventureBookId}
        />
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="a-main">
          {adventures.length === 0 ? (
            <p>No Adventure available .</p>
          ) : (
            adventures.map(
              ({ _id, image, name, location, description, events, review }) => (
                <div className="a-inner" key={_id}>
                  <div className="a-first">
                    <img src={image} alt={name} />
                    <div className="text-center my-6">
                      <button
                        className=" bg-black text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
                        onClick={() => bookAdventure(events, _id)}
                      >
                        Book Adventure
                      </button>
                      <button
                        onClick={() => {
                          handleReview(_id);
                        }}
                        className=" bg-black text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
                      >
                        Review
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
                    <div>
                      <b>Review: </b>
                      <ul>
                        {review.map((s, index) => (
                          <li key={index}> • {s}</li>
                        ))}
                      </ul>
                    </div>
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
    </>
  );
};

export default adventure;
