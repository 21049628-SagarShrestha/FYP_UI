import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import ConfirmAdventure from "./ConfirmAdvneture";
import { useEffect } from "react";

const AdventureReservation = ({ events, adventureBookId }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [price, setPrice] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submitAlbum = () => setShowConfirmation(true);
  const selectedEvent = events.find(
    (event) => event.eventName === watch("event")
  );
  console.log(selectedEvent, "evente");
  useEffect(() => {
    if (selectedEvent) {
      setPrice(selectedEvent.price);
    } else {
      setPrice("");
    }
  }, [selectedEvent]);
  return (
    <>
      {showConfirmation ? (
        <ConfirmAdventure
          eventDate={watch("eventDate")}
          userName={watch("userName")}
          phone={watch("phone")}
          event={watch("event")}
          price={price}
          adventureId={adventureBookId}
        />
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white  border border-black  rounded-lg p-3 max-w-4xl mx-auto my-10">
            <h3 className="text-center font-extrabold uppercase">
              Make Bookings
            </h3>
            <br />

            <form
              className="flex flex-col sm:flex-row gap-4"
              onSubmit={handleSubmit(submitAlbum)}
            >
              <div className="flex flex-col gap-4 flex-1">
                <label className="font-semibold">Event Date :</label>
                <input
                  className="border p-3 rounded-lg "
                  {...register("eventDate", { required: true })}
                  type="Date"
                  min={new Date().toISOString().split("T")[0]} // Set min attribute to current date
                />
                {errors.eventDate && <p>eventDate is required</p>}

                <label className="font-semibold">User name : </label>
                <input
                  className="border p-3 rounded-lg "
                  {...register("userName", { required: true })}
                  type="text"
                />
                {errors.userName && <p>userName is required</p>}

                <label className="font-semibold">Phone : </label>
                <input
                  className="border p-3 rounded-lg "
                  {...register("phone", { required: true })}
                  type="Number"
                />
                {errors.phone && <p>phone is required</p>}
              </div>
              <div className="flex flex-col flex-1 gap-4">
                <label className="font-semibold">Choose Event: </label>
                <select
                  className="border p-3 rounded-lg "
                  {...register("event", { required: true })}
                >
                  <option value="" disabled>
                    Select an event
                  </option>
                  {events &&
                    events.map((event, index) => (
                      <option key={index} value={event.eventName}>
                        {event.eventName}
                      </option>
                    ))}
                </select>
                {errors.event && <p>Event is required</p>}

                {/* <input
              {...register("price", { required: true })}
              value={
                watch("event")
                  ? events.find((event) => event.eventName === watch("event"))
                      .price
                  : ""
              }
            /> */}
                <label className="font-semibold">Price: </label>
                <input
                  className="border p-3 rounded-lg "
                  type="text"
                  value={price}
                  readOnly // Make the input field read-only
                />

                <input
                  className=" p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default AdventureReservation;
