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
      console.error("Error adding hotels:", error);
    }
  };

  const handleImagePreview = (e) => {
    const files = e.target.files;
    handleImagePreviews(files, setImagePreviews);
  };

  return (
    <div>
      <h3>{destinationId ? "Edit Destination" : "Add new Destination"}</h3>

      <form onSubmit={handleSubmit(submitAlbum)} encType="multipart/form-data">
        <label>Destination Name :</label>
        <input
          {...register("name", { required: true })}
          placeholder="name"
          type="text"
        />
        {errors.name && <p>Name is required</p>}

        <label>Location :</label>
        <input
          {...register("location", { required: true })}
          placeholder="location"
          type="text"
        />
        {errors.location && <p>Location is required</p>}

        <label>Description :</label>
        <input
          {...register("description", { required: true })}
          placeholder="description"
          type="text"
        />
        {errors.description && <p>Description is required</p>}

        <label>Rating :</label>
        <input
          {...register("rating", { required: true })}
          placeholder="rating"
          type="number"
        />
        {errors.rating && <p>Rating is required</p>}

        <label>Weather Info :</label>
        <input
          {...register("weatherInfo", { required: true })}
          placeholder="weatherInfo"
          type="text"
        />
        {errors.weatherInfo && <p>weatherInfo is required</p>}

        <label>Language :</label>
        <input
          {...register("language", { required: true })}
          placeholder="language"
          type="text"
        />
        {errors.language && <p>language is required</p>}

        <label>Cost :</label>
        <input
          {...register("cost", { required: true })}
          placeholder="cost"
          type="number"
        />
        {errors.cost && <p>cost is required</p>}

        <label>Famous Places :</label>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input
              {...register(`placesToVisit.${index}`, { required: true })}
              placeholder={`Places To Visit ${index + 1}`}
              type="text"
            />
            {errors.placesToVisit && errors.placesToVisit[index] && (
              <p>{errors.placesToVisit[index].message}</p>
            )}
            <button type="button" onClick={() => remove(index)}>
              Remove placesToVisit
            </button>
          </div>
        ))}

        <button type="button" onClick={() => append("")}>
          Add placesToVisit
        </button>

        <label>Image :</label>
        <input
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
          type="submit"
          value={destinationId ? "Update Destination " : "Add Destination"}
        />
      </form>
    </div>
  );
};

export default AddDestination;
