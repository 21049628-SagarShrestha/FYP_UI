// ExampleComponent.js
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  useAddDestinationsMutation,
  useUpdateDestinationsMutation,
} from "@/api/api";
import { handleImagePreviews } from "@/utils/ImageUtils";
import {
  deleteFile,
  uploadFileToFirebaseStorage,
} from "@/utils/firebaseStorage";

const AddDestination = ({ destinationId, image }) => {
  const [addDestinations] = useAddDestinationsMutation();
  const [updateDestinations] = useUpdateDestinationsMutation();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "placesToVisit",
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const submitAlbum = async (data) => {
    try {
      const imagesArray = Array.isArray(data.destinationImage)
        ? data.destinationImage
        : Object.values(data.destinationImage);

      const uploadPromises = imagesArray.map((image) => {
        const folder = "destinationImages";
        return uploadFileToFirebaseStorage(image, folder);
      });

      const resolvedDownloadURLs = await Promise.all(uploadPromises);

      //Filter out null values (failed Uploads)
      const successulURLs = resolvedDownloadURLs.filter((url) => url !== null);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("location", data.location);
      formData.append("description", data.description);
      formData.append("rating", data.rating);
      formData.append("cost", data.cost);
      formData.append("weatherInfo", data.weatherInfo);
      formData.append("language", data.language);

      data.placesToVisit.forEach((places, index) => {
        formData.append(`placesToVisit[${index}]`, places);
      });

      successulURLs.forEach((url, index) => {
        formData.append(`image[${index}]`, url);
      });

      if (destinationId) {
        const deletePromises = image.map(async (x) => {
          return deleteFile(x);
        });
        await Promise.all(deletePromises);
        await updateDestinations({
          id: destinationId,
          updateDestination: formData,
        });
      } else {
        await addDestinations(formData).unwrap();
      }
      reset();
      setImagePreviews([]);
    } catch (error) {
      console.error("Error adding Destination:", error);
    }
  };

  const handleImagePreview = (e) => {
    const files = e.target.files;
    handleImagePreviews(files, setImagePreviews);
  };

  return (
    <div className="border border-black bg-white  rounded-lg p-3 max-w-4xl mx-auto my-10 ">
      <h3 className="text-xl font-bold text-center">{destinationId ? "Edit Destination" : "Add new Destination"}</h3>

      <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit(submitAlbum)} encType="multipart/form-data">
      <div className="flex flex-col gap-4 flex-1">
        <input
        className="border p-3 rounded-lg "
          {...register("name", { required: true })}
          placeholder="name"
          type="text"
        />
        {errors.name && <p>Name is required</p>}

        <input
        className="border p-3 rounded-lg "
          {...register("location", { required: true })}
          placeholder="location"
          type="text"
        />
        {errors.location && <p>Location is required</p>}

        <input
        className="border p-3 rounded-lg "
          {...register("description", { required: true })}
          placeholder="description"
          type="text"
        />
        {errors.description && <p>Description is required</p>}

        <input
        className="border p-3 rounded-lg "
          {...register("rating", { required: true })}
          placeholder="rating"
          type="number"
        />
        {errors.rating && <p>Rating is required</p>}

        <input
        className="border p-3 rounded-lg "
          {...register("weatherInfo", { required: true })}
          placeholder="weatherInfo"
          type="text"
        />
        {errors.weatherInfo && <p>weatherInfo is required</p>}
      </div>
      <div className="flex flex-col gap-4 flex-1">
        <input
        className="border p-3 rounded-lg "
          {...register("language", { required: true })}
          placeholder="language"
          type="text"
        />
        {errors.language && <p>language is required</p>}

        <input
        className="border p-3 rounded-lg "
          {...register("cost", { required: true })}
          placeholder="cost"
          type="number"
        />
        {errors.cost && <p>cost is required</p>}

        <label>Famous Places :</label>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input
            className="border p-3 rounded-lg "
              {...register(`placesToVisit.${index}`, { required: true })}
              placeholder={`Places To Visit ${index + 1}`}
              type="text"
            />
            {errors.placesToVisit && errors.placesToVisit[index] && (
              <p>{errors.placesToVisit[index].message}</p>
            )}
            <button 
            className="ml-6 bg-red-500 text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
            type="button" onClick={() => remove(index)}>
              Remove 
            </button>
          </div>
        ))}

        <button
        className=" bg-slate-500 text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
         type="button" onClick={() => append("")}>
          Add 
        </button>

        <label>Image :</label>
        <input
        className="border p-3 rounded-lg "
          {...register("destinationImage", {
            required: true,
            validate: {
              fileFormat: (value) => {
                if (!value || !value.type || !value.type.startsWith("image/")) {
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

        {errors.destinationImage && (
          <p>
            {errors.destinationImage.type === "fileFormat"
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
          value={destinationId ? "Update Destination " : "Add Destination"}
        />
      </div>
      </form>
    </div>
  );
};

export default AddDestination;
