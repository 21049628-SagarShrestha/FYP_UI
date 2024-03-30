// ExampleComponent.js
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useAddRoomsMutation, useUpdateRoomsMutation } from "@/api/api";
import { handleImagePreviews } from "@/utils/ImageUtils";
import {
  uploadFileToFirebaseStorage,
  deleteFile,
} from "@/utils/firebaseStorage";

const AddRoom = ({ hotelId, roomId, image }) => {
  const [addRooms] = useAddRoomsMutation();
  const [updateRooms] = useUpdateRoomsMutation();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "facilities",
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const submitAlbum = async (data) => {
    try {
      const imagesArray = Array.isArray(data.roomImage)
        ? data.roomImage
        : Object.values(data.roomImage);

      const uploadPromises = imagesArray.map((image) => {
        const folder = "roomImages";
        return uploadFileToFirebaseStorage(image, folder);
      });

      const resolvedDownloadURLs = await Promise.all(uploadPromises);

      //Filter out null values (failed Uploads)
      const successulURLs = resolvedDownloadURLs.filter((url) => url !== null);
      const formData = new FormData();
      formData.append("roomNumber", data.roomNumber);
      formData.append("roomType", data.roomType);
      formData.append("pricePerNight", data.pricePerNight);
      formData.append("availability", data.availability);
      formData.append("hotelId", hotelId);

      data.facilities.forEach((facility, index) => {
        formData.append(`facilities[${index}]`, facility);
      });

      successulURLs.forEach((url, index) => {
        formData.append(`image[${index}]`, url);
      });

      if (roomId) {
        const deletePromises = image.map(async (x) => {
          return deleteFile(x);
        });
        await Promise.all(deletePromises);
        await updateRooms({ id: roomId, updateRoom: formData }).unwrap();
      } else {
        await addRooms(formData).unwrap();
      }
      reset();
      setImagePreviews([]);
    } catch (error) {
      console.error("Error adding/upating Rooms:", error);
    }
  };

  const handleImagePreview = (e) => {
    const files = e.target.files;

    handleImagePreviews(files, setImagePreviews);
  };

  return (
    <div className="border border-black bg-white  rounded-lg p-3 max-w-4xl mx-auto my-10 ">
      <h3 className="text-xl font-bold text-center">
        {roomId ? "Edit Room" : "Add new Room"}
      </h3>

      <form
        className="flex flex-col sm:flex-row gap-4"
        onSubmit={handleSubmit(submitAlbum)}
        encType="multipart/form-data"
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            className="border p-3 rounded-lg "
            {...register("roomNumber", { required: true })}
            placeholder="RoomNumber"
            type="Number"
          />
          {errors.RoomNumber && <p>RoomNumber is required</p>}

          <div>
            <label>Room Type:</label>
            <div>
              <label>
                <input
                  className="border p-3 rounded-lg "
                  {...register("roomType", { required: true })}
                  type="radio"
                  value="Single"
                />
                Single
              </label>
              <label>
                <input
                  className="border p-3 rounded-lg "
                  {...register("roomType", { required: true })}
                  type="radio"
                  value="Double"
                />
                Double
              </label>
              <label>
                <input
                  className="border p-3 rounded-lg "
                  {...register("roomType", { required: true })}
                  type="radio"
                  value="Suite"
                />
                Suite
              </label>
            </div>
            {errors.roomType && <p>Room Type is required</p>}
          </div>

          <input
            className="border p-3 rounded-lg "
            {...register("pricePerNight", { required: true })}
            placeholder="PricePerNight"
            type="Number"
          />
          {errors.PricePerNight && <p>PricePerNight is required</p>}

          <label>
            Availability:
            <input
              className="border p-3 rounded-lg "
              {...register("availability", { required: true })}
              type="checkbox"
            />
          </label>
          {errors.availability && <p>Availability is required</p>}
        </div>
        <div className="flex flex-col gap-4 flex-1">
          {fields.map((field, index) => (
            <div key={field.id}>
              <input
                className="border p-3 rounded-lg "
                {...register(`facilities.${index}`, { required: true })}
                placeholder={`Facility ${index + 1}`}
                type="text"
              />
              {errors.facilities && errors.facilities[index] && (
                <p>{errors.facilities[index].message}</p>
              )}
              <button
                className="ml-6 bg-red-500 text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
                type="button"
                onClick={() => remove(index)}
              >
                Remove Facility
              </button>
            </div>
          ))}

          <button
            className=" bg-slate-500 text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
            type="button"
            onClick={() => append("")}
          >
            Add Facility
          </button>

          <input
            className="border p-3 rounded-lg "
            {...register("roomImage", {
              required: true,
              validate: {
                fileFormat: (value) => {
                  if (
                    !value ||
                    !value.type ||
                    !value.type.startsWith("image/")
                  ) {
                    return {
                      type: "fileFormat",
                      message:
                        "Images are required and must be in the correct format.",
                    };
                  }
                  return true;
                },
              },
            })}
            type="file"
            accept="image/*"
            onChange={handleImagePreview}
            multiple
          />

          {errors.hotelImage && (
            <p>
              {errors.hotelImage.type === "fileFormat"
                ? "Images are required and must be in the correct format."
                : "Images are required."}
            </p>
          )}

          {imagePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index + 1}`}
              style={{ width: "100px", height: "100px", marginRight: "10px" }}
            />
          ))}
          <input
            className=" bg-slate-500 text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
            type="submit"
            value={roomId ? "Update Room" : "Add Room"}
          />
        </div>
      </form>
    </div>
  );
};

export default AddRoom;
