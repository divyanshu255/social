// export const uploadToCloudinary = async (imageUri) => {
//   const data = new FormData();

//   data.append("file", {
//     uri: imageUri,
//     name: "photo.jpg",
//     type: "image/jpg",
//   });

//   data.append("upload_preset", "linkup_preset"); // Replace with your preset
// //   data.append("cloud_name", "dlgnquxda"); // Replace with your cloud name

//   try {
//     const res = await fetch("https://api.cloudinary.com/v1_1/dlgnquxda/image/upload", {
//       method: "POST",
//       body: data,
//     });

//     const json = await res.json();
//     return json.secure_url; // Cloudinary image URL
//   } catch (err) {
//     console.error("Cloudinary upload failed:", err);
//     return null;
//   }
// };



// export const uploadToCloudinary = async (imageUri) => {
//   const data = new FormData();

//   data.append("file", {
//     uri: imageUri,
//     name: "photo.jpg",
//     type: "image/jpg",
//   });

//   data.append("upload_preset", "linkup_preset"); // your unsigned preset

//   try {
//     const res = await fetch("https://api.cloudinary.com/v1_1/dlgnquxda/image/upload", {
//       method: "POST",
//       body: data,
//     });

//     const json = await res.json();

//     if (!res.ok) {
//       throw new Error(json.error?.message || "Upload failed");
//     }

//     return json.secure_url;
//   } catch (err) {
//     console.error("Cloudinary upload failed:", err.message);
//     return null;
//   }
// };
// import { Platform } from "react-native";


// export const uploadToCloudinary = async (file) => {
//   const formData = new FormData();

//   if (Platform.OS === "web") {
//     formData.append("file", file); // file is a JS File object
//   } else {
//     formData.append("file", {
//       uri: file.uri,
//       name: file.name,
//       type: file.type,
//     });
//   }

//   formData.append("upload_preset", "linkup_preset");

//   try {
//     const res = await fetch("https://api.cloudinary.com/v1_1/dlgnquxda/image/upload", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.error?.message || "Upload failed");

//     return data.secure_url;
//   } catch (err) {
//     console.error("Cloudinary upload failed:", err.message);
//     return null;
//   }
// };
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

