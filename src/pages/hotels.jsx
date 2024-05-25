import React from "react";
import { useGetHotelsQuery, useGetRoomReservationsQuery } from "@/api/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import Review from "../components/Review";
import { useEffect } from "react";
import Header from "../components/Common/Header";

const hotels = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [recommendedHotels, setRecommendedHotels] = useState([]);
  const [hotelId, setHotelId] = useState(null);
  const [review, setReview] = useState(false);
  let { data: { Hotels: hotels } = {}, error, isLoading } = useGetHotelsQuery();
  const { data: { RoomReservation: reserves } = {} } =
    useGetRoomReservationsQuery();
  // Filter previous reservations based on the current user's email
  const prevReserve = reserves?.filter(
    (reserve) => reserve.user === currentUser.email
  );

  useEffect(() => {
    if (hotelId !== null) {
      setReview(true);
    }
  }, [hotelId]);
  const handleReview = (hotelId) => {
    let hasReviewForHotel = false;

    prevReserve.forEach((reserve) => {
      if (reserve.hotelId === hotelId) {
        hasReviewForHotel = true;
        return; // Exit the loop early if a review for this hotel is found
      }
    });

    if (hasReviewForHotel) {
      setHotelId(hotelId);
      setReview(true);
    } else {
      toast.error("Please book to add review!", {
        position: "top-right",
      });
    }
  };
  const RecommendHotel = () => {
    // Extract locations from previous reservations
    // const prevFacilities = prevReserve.flatMap((reserve) => reserve.facilities);

    const prevFacilities = [];
    prevReserve.forEach((reserve) => {
      reserve.facilities.forEach((facility) => {
        if (!prevFacilities.includes(facility)) {
          prevFacilities.push(facility);
        }
      });
    });

    // Filter hotels based on facilities
    const filteredHotels = hotels.filter((hotel) => {
      return hotel.facilities.every((facility) =>
        prevFacilities.includes(facility)
      );
    });

    setRecommendedHotels(filteredHotels);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching hotels</p>;
  }

  const handleCloseBooking = () => {
    setReview(false);
  };

  return (
    <>
      <Header />
      <div className="d-main">
        {review && <Review hotelId={hotelId} onClose={handleCloseBooking} />}
        <button
          className=" bg-slate-600 text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
          onClick={() => RecommendHotel()}
        >
          {" "}
          Recommend
        </button>
        {(hotels && hotels.length > 0) ||
        (recommendedHotels && recommendedHotels.length > 0) ? (
          (recommendedHotels && recommendedHotels.length > 0
            ? recommendedHotels
            : hotels
          ).map((i) => {
            return (
              <div key={i._id} className="d-inner h-xxxxl w-auto">
                <div className="d-first">
                  <img
                    src={i.image}
                    // src={`${api_port}images/hotels/${i.image}`}
                    alt={i.name}
                  />
                </div>
                <div className="d-second">
                  <h3 className="text-xl font-bold text-center">{i.name}</h3>
                  <br />

                  <p>
                    <b>Location: </b>
                    {i.location}
                  </p>
                  <p>
                    <b>Room: </b>
                    {i.room}
                  </p>

                  <div>
                    <b>Facilities: </b>
                    <ul>
                      {i.facilities.map((facility, index) => (
                        <li key={index}> • {facility}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <b>Review: </b>
                    <ul>
                      {i.review.map((s, index) => (
                        <li key={index}> • {s}</li>
                      ))}
                    </ul>
                  </div>

                  <p>
                    <b>Contact: </b> {i.contact}
                  </p>
                  <p>
                    <b>Rating: </b> {i.rating}
                  </p>
                  <p>
                    <b>Description: </b> {i.description}
                  </p>
                  <br />
                  <button
                    className=" bg-black text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
                    onClick={() =>
                      navigate(
                        `/rooms?hotelId=${i._id}&&facilities=${i.facilities}`
                      )
                    }
                  >
                    View Rooms
                  </button>
                  <button
                    onClick={() => {
                      handleReview(i._id);
                    }}
                    className=" bg-black text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
                  >
                    Review
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>Loading hotels...</p>
        )}
      </div>
    </>
  );
};

export default hotels;