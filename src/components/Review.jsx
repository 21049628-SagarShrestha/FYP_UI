import React from "react";
import { useForm } from "react-hook-form";
import { useAddReviewsMutation, useAddReviewsAMutation } from "../api/api";
const Review = ({ hotelId, onClose, adventureId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [addReviews] = useAddReviewsMutation();
  const [addReviewsA] = useAddReviewsAMutation();

  const onSubmit = async (data) => {
    // Add the hotelId to the review data

    if (hotelId) {
      console.log("hotelo");
      // Add the hotelId to the review data
      data.hotelId = hotelId;
      console.log(data);
      await addReviews(data).unwrap();
      onClose();
    } else if (adventureId) {
      console.log("adv");
      // Add the hotelId to the review data
      data.adventureId = adventureId;

      console.log(data);
      await addReviewsA(data).unwrap();
      onClose();
    } else {
      return null;
    }
  };

  function handleClose() {
    onClose();
  }
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <button
          className="absolute top-90 right-100 px-4 py-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={handleClose}
        >
          <i className="fas fa-times" />
        </button>
        <div className="bg-white  border border-black  rounded-lg p-3 max-w-4xl mx-auto my-10">
          <form
            className="flex flex-col sm:flex-row gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-4 flex-1">
              <textarea
                className="border p-3 rounded-lg "
                rows="4"
                cols="50"
                {...register("review", { required: true })}
                placeholder="Enter your experience"
                name="review"
              />
              {errors.review && <p>Review is required</p>}

              <input
                className=" p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                type="submit"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Review;
