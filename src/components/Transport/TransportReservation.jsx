import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ConfirmTransport from "./ConfirmTransport";

const TransportReservation = ({
  flightDate,
  airline,
  arrival_airport,
  departure_time,
  flight_time,
  price,
  departure_airport,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = () => setShowConfirmation(true);

  const resetConfirmation = () => {
    setShowConfirmation(false);
    reset();
  };

  return (
    <div>
      {showConfirmation ? (
        <ConfirmTransport
          userName={watch("userName")}
          phone={watch("phone")}
          price={price}
          airline={airline}
          departure_airport={departure_airport}
          arrival_airport={arrival_airport}
          departure_time={departure_time}
          flight_time={flight_time}
          flightDate={flightDate}
          resetConfirmation={resetConfirmation}
        />
      ) : (
        <div>
          <h3>Book a flight</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label>User name: </label>
            <input
              {...register("userName", { required: true })}
              placeholder="Full Name"
              type="text"
            />
            {errors.userName && <p>User name is required</p>}

            <label>Phone: </label>
            <input
              {...register("phone", { required: true })}
              placeholder="Contact"
              type="number"
            />
            {errors.phone && <p>Phone is required</p>}

            <input type="submit" />
          </form>
        </div>
      )}
    </div>
  );
};

export default TransportReservation;
