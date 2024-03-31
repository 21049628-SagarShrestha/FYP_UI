import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ConfirmHotel from "./ConfirmHotel";

const Reservation = ({ price, room_num, facilities }) => {
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
    <>
      {showConfirmation ? (
        <ConfirmHotel
          checkInDate={watch("checkInDate")}
          checkOutDate={watch("checkOutDate")}
          totalDays={totalDays}
          price={price}
          room_num={room_num}
          facilities={facilities}
        />
      ) : (
        <div className="border border-black bg-white  rounded-lg p-3 max-w-4xl mx-auto my-10 ">
          <h3 className="text-xl font-bold text-center">Make Bookings</h3>

          <p className="text-l font-semibold text-center">
            Total Number of Days {totalDays}
          </p>
          <br />
          <form
            className="flex flex-col sm:flex-row gap-4"
            onSubmit={handleSubmit(submitAlbum)}
          >
            <div className="flex flex-col gap-4 flex-1">
              <label className="font-semibold">CheckInDate</label>
              <input
                className="border p-3 rounded-lg "
                {...register("checkInDate", { required: true })}
                type="Date"
                min={new Date().toISOString().split("T")[0]} // Set min attribute to current date
                onBlur={calculateTotalDays}
              />
              {errors.checkInDate && <p>checkInDate is required</p>}
            </div>
            <div className="flex flex-col flex-1 gap-4">
              <label className="font-semibold">CheckOutDate</label>
              <input
                className="border p-3 rounded-lg "
                {...register("checkOutDate", { required: true })}
                type="Date"
                min={new Date().toISOString().split("T")[0]} // Set min attribute to current date
                onBlur={calculateTotalDays}
              />
              {errors.checkOutDate && <p>CheckOutDate is required</p>}
            </div>

            <div className="flex flex-col flex-1 gap-4">
              <br />
              <input
                className=" bg-black text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
                type="submit"
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};
export default Reservation;
