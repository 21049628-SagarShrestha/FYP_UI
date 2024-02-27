// ExampleComponent.js
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  useAddAdventuresMutation,
  useUpdateAdventuresMutation,
} from "@/api/api";
import { handleImagePreviews } from "@/utils/ImageUtils";
import {
  deleteFile,
  uploadFileToFirebaseStorage,
} from "@/utils/firebaseStorage";

const AddAdventure = ({ adventureId, image }) => {
  const [addAdventures] = useAddAdventuresMutation();
  const [updateAdventures] = useUpdateAdventuresMutation();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "adventureType",
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const submitAlbum = async (data) => {
    try {
      const imagesArray = Array.isArray(data.adventureImage)
        ? data.adventureImage
        : Object.values(data.adventureImage);

      const uploadPromises = imagesArray.map((image) => {
        const folder = "adventureImages";
        return uploadFileToFirebaseStorage(image, folder);
      });

      const resolvedDownloadURLs = await Promise.all(uploadPromises);

      //Filter out null values (failed Uploads)
      const successulURLs = resolvedDownloadURLs.filter((url) => url !== null);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("location", data.location);
      formData.append("description", data.description);

      data.adventureType.forEach((event, index) => {
        formData.append(`events[${index}][eventName]`, event.eventName);
        formData.append(`events[${index}][price]`, event.price);
      });

      successulURLs.forEach((url, index) => {
        formData.append(`image[${index}]`, url);
      });

      if (adventureId) {
        const deletePromises = image.map(async (x) => {
          return deleteFile(x);
        });
        await Promise.all(deletePromises);
        await updateAdventures({
          id: adventureId,
          updateAdventure: formData,
        });
      } else {
        await addAdventures(formData).unwrap();
      }
      reset();
      setImagePreviews([]);
    } catch (error) {
      console.error("Error adding Adventure:", error);
    }
  };

  const handleImagePreview = (e) => {
    const files = e.target.files;
    handleImagePreviews(files, setImagePreviews);
  };

  return (
    <div>
      <h3>{adventureId ? "Edit Adventure" : "Add new Adventure"}</h3>

      <form onSubmit={handleSubmit(submitAlbum)} encType="multipart/form-data">
        <label>Adventure Name :</label>
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

        <label>Adventure Type :</label>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input
              {...register(`adventureType.${index}.eventName`, {
                required: true,
              })}
              placeholder={`Event Name ${index + 1}`}
              type="text"
            />
            {errors.adventureType && errors.adventureType[index] && (
              <p>{errors.adventureType[index].eventName.message}</p>
            )}

            <input
              {...register(`adventureType.${index}.price`, { required: true })}
              placeholder={`Price ${index + 1}`}
              type="number"
            />
            {errors.adventureType && errors.adventureType[index] && (
              <p>{errors.adventureType[index].message}</p>
            )}
            <button type="button" onClick={() => remove(index)}>
              Remove adventureType
            </button>
          </div>
        ))}

        <button type="button" onClick={() => append("")}>
          Add adventureType
        </button>

        <label>Image :</label>
        <input
          {...register("adventureImage", {
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

        {errors.adventureImage && (
          <p>
            {errors.adventueImage.type === "fileFormat"
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
          value={adventureId ? "Update Adventure " : "Add Adventure"}
        />
      </form>
    </div>
  );
};

export default AddAdventure;
