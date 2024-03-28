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
    <div className="border border-black bg-white  rounded-lg p-3 max-w-4xl mx-auto my-10 ">
      <h3 className="text-xl font-bold text-center">{adventureId ? "Edit Adventure" : "Add new Adventure"}</h3>

      <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit(submitAlbum)} encType="multipart/form-data">
      <div className="flex flex-col gap-4 flex-1">
        <label className="font-semibold">Adventure Name :</label>
        <input
        className="border p-3 rounded-lg "
          {...register("name", { required: true })}
          placeholder="name"
          type="text"
        />
        {errors.name && <p>Name is required</p>}

        <label className="font-semibold">Location :</label>
        <input
        className="border p-3 rounded-lg "
          {...register("location", { required: true })}
          placeholder="location"
          type="text"
        />
        {errors.location && <p>Location is required</p>}

        <label className="font-semibold">Description :</label>
        <input
        className="border p-3 rounded-lg "
          {...register("description", { required: true })}
          placeholder="description"
          type="text"
        />
        {errors.description && <p>Description is required</p>}
        </div>
        <div className="flex flex-col flex-1 gap-4">
        <label className="font-semibold">Rating :</label>
        <input
        className="border p-3 rounded-lg "
          {...register("rating", { required: true })}
          placeholder="rating"
          type="number"
        />

      

        <label className="font-semibold">Adventure Type :</label>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input
            className="border p-3 rounded-lg "
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
            className="border p-3 rounded-lg "
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

        <label className="font-semibold">Image :</label>
        <input
        className="border p-3 rounded-lg "
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
        className=" bg-slate-500 text-white border-2 border-gray-500 hover:bg-white hover:text-black hover:border-black font-bold py-1 px-2 rounded-xl"
          type="submit"
          value={adventureId ? "Update Adventure " : "Add Adventure"}
        />
      </div>
      </form>
    </div>
  );
};

export default AddAdventure;
