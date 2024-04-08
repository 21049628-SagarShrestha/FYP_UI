import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
    control,
  } = useForm({
    defaultValues: {
      passengers: [{ passenger: "", phone: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "passengers",
  });

  const onSubmit = (data) => {
    setShowConfirmation(true);
  };

  const resetConfirmation = () => {
    setShowConfirmation(false);
    reset();
  };

  return (
    <>
      {showConfirmation ? (
        <ConfirmTransport
          passengers={watch("passengers")}
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
            <h3 className="text-center font-extrabold uppercase">
              Book a flight
            </h3>

            <form
              className="flex flex-col sm:flex-row gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col gap-4 flex-1">
                  <label className="font-semibold">
                    Passenger {index + 1} name:{" "}
                  </label>
                  <input
                    className="border p-3 rounded-lg"
                    {...register(`passengers[${index}].passenger`, {
                      required: true,
                    })}
                    placeholder="Full Name"
                    type="text"
                  />
                  {errors.passengers && errors.passengers[index] && (
                    <p>Passenger name is required</p>
                  )}

                  <label className="font-semibold">Phone: </label>
                  <input
                    className="border p-3 rounded-lg"
                    {...register(`passengers[${index}].phone`, {
                      required: true,
                    })}
                    placeholder="Contact"
                    type="number"
                  />
                  {errors.passengers && errors.passengers[index] && (
                    <p>Phone is required</p>
                  )}
                  {index > 0 && (
                    <button
                      className="p-3 bg-red-500 text-white rounded-lg uppercase hover:opacity-95"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <FaMinus /> Remove Passenger
                    </button>
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-4 flex-1">
                <button
                  className="p-3 bg-blue-500 text-white rounded-lg uppercase hover:opacity-95"
                  type="button"
                  onClick={() => append({ passenger: "", phone: "" })}
                >
                  <FaUser /> Add Passenger
                </button>
              </div>
              <div className="flex flex-col gap-4 flex-1">
                <br />
                <input
                  className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
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

export default TransportReservation;
