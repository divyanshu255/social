
import { Platform } from "react-native";

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();

  if (Platform.OS === "web") {
    formData.append("file", file); // JS file object
  } else {
    formData.append("file", {
      uri: file.uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });
  }

  formData.append("upload_preset", "linkup_preset"); // your Cloudinary preset

  try {
    const res = await fetch("https://api.cloudinary.com/v1_1/dlgnquxda/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Upload failed");

    return data.secure_url;
  } catch (err) {
    console.error("Cloudinary upload failed:", err.message);
    return null;
  }
};

