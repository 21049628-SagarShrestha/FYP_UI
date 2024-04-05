import React from "react";
import { useForm } from "react-hook-form";
import { useAddReviewsMutation } from "../api/api";
const Review = ({ hotelId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [addReviews] = useAddReviewsMutation();

  const onSubmit = async (data) => {
    // Add the hotelId to the review data
    data.hotelId = hotelId;
    console.log(data);
    await addReviews(data).unwrap();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-box">
          <textarea
            rows="4"
            cols="50"
            {...register("review", { required: true })}
            placeholder="Enter your experience"
            name="review"
          />
          {errors.review && <p>Review is required</p>}
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Review;
