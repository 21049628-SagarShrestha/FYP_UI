import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ConfirmAdventure from "./ConfirmAdvneture";

const AdventureReservation = ({ eventName }) => {
  console.log(eventName);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submitAlbum = () => setShowConfirmation(true);
  return (
    <div>
      {showConfirmation ? (
        <ConfirmAdventure
          eventDate={watch("eventDate")}
          userName={watch("userName")}
          phone={watch("phone")}
          event={watch("event")}
          price={watch("price")}
        />
      ) : (
        <div>
        
          <h3>Make Bookings</h3>

          <form onSubmit={handleSubmit(submitAlbum)}>
            <label>Event Date :</label>
            <input
              {...register("eventDate", { required: true })}
              type="Date"
              min={new Date().toISOString().split("T")[0]} // Set min attribute to current date
            />
            {errors.eventDate && <p>eventDate is required</p>}

            <label>User name : </label>
            <input {...register("userName", { required: true })} type="text" />
            {errors.userName && <p>userName is required</p>}

            <label>Phone : </label>
            <input {...register("phone", { required: true })} type="Number" />
            {errors.phone && <p>phone is required</p>}

            {/* <label>Choose Event: </label>
            <select {...register("event", { required: true })}>
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
            {errors.event && <p>Event is required</p>} */}

            <p>Price: ${watch("price")}</p>

            <input type="submit" />
          </form>
        </div>
      )}
    </div>
  );
};
export default AdventureReservation;
