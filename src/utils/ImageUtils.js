export const handleImagePreviews = (files, setImagePreviews) => {
  const previews = [];

  const readAndPreview = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      previews.push(event.target.result);
      if (previews.length === files.length) {
        setImagePreviews(previews);
      }
    };
    reader.readAsDataURL(file);
  };
  for (let i = 0; i < files.length; i++) {
    readAndPreview(files[i]);
  }
};
