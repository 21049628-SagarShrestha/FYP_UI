// ExampleComponent.js
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useAddHotelsMutation } from "../api/api";


const addHotel = () => {
  //setting useform
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [addHotels] = useAddHotelsMutation();

  //control facility array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "facilities",
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const submitAlbum = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("location", data.location);
      formData.append("description", data.description);
      formData.append("rating", data.rating);
      formData.append("contact", data.contact);

      // Append facilities as an array
      data.facilities.forEach((facility, index) => {
        formData.append(`facilities[${index}]`, facility);
      });

      // Append hotelImage (assuming it's a File object)
      formData.append("hotelImage", data.hotelImage[0]);

      // Use the addHotels mutation to send the FormData
      await addHotels(formData);
    } catch (error) {
      // Handle any errors from the mutation
      console.error("Error adding hotels:", error);
    }
  };

  // Handle image preview
  const handleImagePreview = (e) => {
    const files = e.target.files;
    const previews = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        previews.push(event.target.result);
        if (previews.length === files.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  return (
    <div>
      <h3>add new Hotels</h3>

      <form onSubmit={handleSubmit(submitAlbum)} encType="multipart/form-data">
        <input
          {...register("name", { required: true })}
          placeholder="name"
          type="text"
        />
        {errors.name && <p>Name is required</p>}

        <input
          {...register("location", { required: true })}
          placeholder="location"
          type="text"
        />
        {errors.location && <p>Location is required</p>}

        <input
          {...register("description", { required: true })}
          placeholder="description"
          type="text"
        />
        {errors.description && <p>description is required</p>}

        <input
          {...register("rating", { required: true })}
          placeholder="rating"
          type="number"
        />
        {errors.rating && <p>rating is required</p>}

        <input
          {...register("contact", { required: true })}
          placeholder="contact"
          type="number"
        />
        {errors.contact && <p>contact is required</p>}

        {/* Facilities input as an array */}
        {fields.map((field, index) => (
          <div key={field.id}>
            <input
              {...register(`facilities.${index}`, { required: true })}
              placeholder={`Facility ${index + 1}`}
              type="text"
            />
            {errors.facilities && errors.facilities[index] && (
              <p>{errors.facilities[index].message}</p>
            )}
            <button type="button" onClick={() => remove(index)}>
              Remove Facility
            </button>
          </div>
        ))}

        <button type="button" onClick={() => append("")}>
          Add Facility
        </button>

        <input
          {...register("hotelImage", {
            required: true,
            validate: {
              fileFormat: (value) => {
                return value && value[0].type.startsWith("image/");
              },
            },
          })}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImagePreview}
        />
        {errors.hotelImage && (
          <p>Image is required and must be in the correct format.</p>
        )}
        {/* Display image previews */}
        {imagePreviews.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt={`Preview ${index + 1}`}
            style={{ width: "100px", height: "100px", marginRight: "10px" }}
          />
        ))}
        <input type="submit" />
      </form>
    </div>
  );
};
export default addHotel;
