// ExampleComponent.js
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useAddHotelsMutation, useUpdateHotelsMutation } from "@/api/api";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase";

const AddHotel = ({ hotelId }) => {
  const [addHotels] = useAddHotelsMutation();
  const [updateHotels] = useUpdateHotelsMutation();
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
      const storage = getStorage(app);
      const downloadURLs = [];
      const imagesArray = Array.isArray(data.hotelImage)
        ? data.hotelImage
        : Object.values(data.hotelImage);

      const uploadPromises = imagesArray.map((image) => {
        return new Promise(async (resolve) => {
          const filename = new Date().getTime() + image.name;
          const storageRef = ref(storage, `hotelImages/${filename}`);
          const uploadTask = uploadBytesResumable(storageRef, image);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              console.log("Error uploading image:", error);
              resolve(null); // Resolve the promise even if an error occurs
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              downloadURLs.push(downloadURL);
              resolve(downloadURL); // Resolve the promise with the download URL
            }
          );
        });
      });

      const resolvedDownloadURLs = await Promise.all(uploadPromises);

      //Filter out null values (failed Uploads)
      const successulURLs = resolvedDownloadURLs.filter((url) => url !== null);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("location", data.location);
      formData.append("description", data.description);
      formData.append("rating", data.rating);
      formData.append("contact", data.contact);

      data.facilities.forEach((facility, index) => {
        formData.append(`facilities[${index}]`, facility);
      });

      successulURLs.forEach((url, index) => {
        formData.append(`image[${index}]`, url);
      });
      if (hotelId) {
        await updateHotels({ id: hotelId, updateHotel: formData }).unwrap();
      } else {
        await addHotels(formData).unwrap();
      }
      reset();
      setImagePreviews([]);
    } catch (error) {
      console.error("Error adding/updating hotels:", error);
    }
  };

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
      <h3>{hotelId ? "Edit Hotel" : "Add new Hotel"}</h3>

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
        {errors.description && <p>Description is required</p>}

        <input
          {...register("rating", { required: true })}
          placeholder="rating"
          type="number"
        />
        {errors.rating && <p>Rating is required</p>}

        <input
          {...register("contact", { required: true })}
          placeholder="contact"
          type="number"
        />
        {errors.contact && <p>Contact is required</p>}

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
        <input type="submit" value={hotelId ? "Update hotel" : "Add Hotel"} />
      </form>
    </div>
  );
};

export default AddHotel;
