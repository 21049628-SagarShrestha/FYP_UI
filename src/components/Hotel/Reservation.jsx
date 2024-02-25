import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ConfirmHotel from "./ConfirmHotel";

const Reservation = ({ price, room_num }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [totalDays, setTotalDays] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const calculateTotalDays = () => {
    const checkInDate = watch("checkInDate");
    const checkOutDate = watch("checkOutDate");

    if (checkInDate && checkOutDate) {
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);
      const timeDifference = endDate.getTime() - startDate.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      setTotalDays(daysDifference);
    }
  };
  const submitAlbum = () => setShowConfirmation(true);
  return (
    <div>
      {showConfirmation ? (
        <ConfirmHotel
          checkInDate={watch("checkInDate")}
          checkOutDate={watch("checkOutDate")}
          totalDays={totalDays}
          price={price}
          room_num={room_num}
        />
      ) : (
        <div>
          <h3>Make Bookings</h3>

          <form onSubmit={handleSubmit(submitAlbum)}>
            <label>CheckInDate</label>
            <input
              {...register("checkInDate", { required: true })}
              type="Date"
              min={new Date().toISOString().split("T")[0]} // Set min attribute to current date
              onBlur={calculateTotalDays}
            />
            {errors.checkInDate && <p>checkInDate is required</p>}

            <label>CheckOutDate</label>
            <input
              {...register("checkOutDate", { required: true })}
              type="Date"
              min={new Date().toISOString().split("T")[0]} // Set min attribute to current date
              onBlur={calculateTotalDays}
            />
            {errors.checkOutDate && <p>CheckOutDate is required</p>}

            <label>Total Number of Days {totalDays}</label>

            <input type="submit" />
          </form>
        </div>
      )}
    </div>
  );
};
export default Reservation;
