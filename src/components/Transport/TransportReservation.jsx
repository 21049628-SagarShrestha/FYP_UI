import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ConfirmTransport from "./ConfirmTransport";
import { FaMinus, FaUser } from "react-icons/fa";
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
    <>
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white  border border-black  rounded-lg p-3 max-w-4xl mx-auto my-10">
          
          <h3 className="text-center font-extrabold uppercase">Book a flight</h3>

          <form 
          className="flex flex-col sm:flex-row gap-4"
          onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 flex-1">
            <label  className="font-semibold">User name: </label>
            <input
            className="border p-3 rounded-lg "
              {...register("userName", { required: true })}
              placeholder="Full Name"
              type="text"
            />
            {errors.userName && <p>User name is required</p>}
            </div>

            <div className="flex flex-col gap-4 flex-1">
            <label  className="font-semibold">Phone: </label>
            <input
            className="border p-3 rounded-lg "
              {...register("phone", { required: true })}
              placeholder="Contact"
              type="number"
              />
            {errors.phone && <p>Phone is required</p>}

            </div>
            <div className="flex flex-col gap-4 flex-1">
            <br />
            <input className=" p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            type="submit" />
            </div>
          </form>
        </div>
        </div>
      )}
    </>
  );
};

export default TransportReservation;
