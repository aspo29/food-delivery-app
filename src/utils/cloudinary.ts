const uploadToCloudinary = async (file: string | Blob) => {
  const data = new FormData();
  data.append("file", file);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  // console.log("Uploading to Cloudinary...");
  // console.log("cloudName:", cloudName);
  // console.log("uploadPreset:", uploadPreset);
  // console.log("file:", file);

  data.append("upload_preset", uploadPreset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: data,
  });

  const result = await res.json();
  console.log("Cloudinary response:", result); // Add this too

  if (!res.ok) {
    console.error("Cloudinary Error:", result); // Log actual error from Cloudinary
    throw new Error("Failed to upload image to Cloudinary");
  }

  return result.secure_url;
};

export { uploadToCloudinary };