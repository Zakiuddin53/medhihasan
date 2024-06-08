// import React, { useState, useEffect } from "react";
// import sha1 from "js-sha1";
// import imageCompression from "browser-image-compression";

// const CloudinaryUploader = ({ imageUrls, setImageUrls }) => {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const MAX_FILE_SIZE_MB = 20;

//   useEffect(() => {
//     uploadFiles(files);
//   }, [files]);

//   const handleFileChange = async (event) => {
//     const selectedFiles = event.target.files;
//     const selectedFilesArray = Array.from(selectedFiles);

//     const compressedFiles = await Promise.all(
//       selectedFilesArray.map(async (file) => {
//         try {
//           const compressedFile = await imageCompression(file, {
//             maxSizeMB: MAX_FILE_SIZE_MB,
//             maxWidthOrHeight: 1920,
//           });
//           return compressedFile;
//         } catch (error) {
//           console.error("Error compressing image:", error);
//           return null;
//         }
//       })
//     );

//     const validFiles = compressedFiles.filter((file) => file !== null);
//     setFiles(validFiles);
//   };

//   const uploadFiles = async (filesToUpload) => {
//     if (filesToUpload.length === 0) return;

//     setLoading(true);

//     const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
//     const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
//     const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
//     const timestamp = Math.floor(Date.now() / 1000);

//     try {
//       const uploadedUrls = [];

//       for (let i = 0; i < filesToUpload.length; i++) {
//         const file = filesToUpload[i];
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("timestamp", timestamp);
//         formData.append("api_key", apiKey);

//         const signature = generateSignature(timestamp, apiSecret);
//         formData.append("signature", signature);

//         const response = await fetch(
//           `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
//           {
//             method: "POST",
//             body: formData,
//           }
//         );
//         if (response.ok) {
//           const data = await response.json();
//           uploadedUrls.push(data.secure_url);
//         } else {
//           console.error("Error uploading image");
//         }
//       }

//       setImageUrls((prevImageUrls) => [...prevImageUrls, ...uploadedUrls]);
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const generateSignature = (timestamp, apiSecret) => {
//     return sha1(`timestamp=${timestamp}${apiSecret}`);
//   };
//   const handleRemoveImage = (indexToRemove) => {
//     setImageUrls((prevImageUrls) =>
//       prevImageUrls.filter((url, index) => index !== indexToRemove)
//     );
//   };
import React, { useState, useEffect } from "react";
import sha1 from "js-sha1";
import imageCompression from "browser-image-compression";

const CloudinaryUploader = ({ imageUrls, setImageUrls }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const MAX_FILE_SIZE_MB = 20;

  useEffect(() => {
    const uploadFiles = async (filesToUpload) => {
      if (filesToUpload.length === 0) return;

      setLoading(true);

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
      const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
      const timestamp = Math.floor(Date.now() / 1000);

      try {
        const uploadedUrls = [];

        for (let i = 0; i < filesToUpload.length; i++) {
          const file = filesToUpload[i];
          const formData = new FormData();
          formData.append("file", file);
          formData.append("timestamp", timestamp);
          formData.append("api_key", apiKey);

          const signature = generateSignature(timestamp, apiSecret);
          formData.append("signature", signature);

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );
          if (response.ok) {
            const data = await response.json();
            uploadedUrls.push(data.secure_url);
          } else {
            console.error("Error uploading image");
          }
        }

        setImageUrls((prevImageUrls) => [...prevImageUrls, ...uploadedUrls]);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false);
      }
    };

    uploadFiles(files);
  }, [files, setImageUrls]);

  const handleFileChange = async (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const compressedFiles = await Promise.all(
      selectedFilesArray.map(async (file) => {
        try {
          const compressedFile = await imageCompression(file, {
            maxSizeMB: MAX_FILE_SIZE_MB,
            maxWidthOrHeight: 1920,
          });
          return compressedFile;
        } catch (error) {
          console.error("Error compressing image:", error);
          return null;
        }
      })
    );

    const validFiles = compressedFiles.filter((file) => file !== null);
    setFiles(validFiles);
  };

  const generateSignature = (timestamp, apiSecret) => {
    return sha1(`timestamp=${timestamp}${apiSecret}`);
  };

  const handleRemoveImage = (indexToRemove) => {
    setImageUrls((prevImageUrls) =>
      prevImageUrls.filter((url, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      <div className="flex justify-center">
        <label
          htmlFor="file-input"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Choose Files
        </label>
        <input
          id="file-input"
          type="file"
          onChange={handleFileChange}
          multiple
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>
      <div
        className="mt-10"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {/* Container for uploaded images */}
        {loading && <p>Uploading...</p>}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/* Container for uploaded images */}
          {imageUrls.map((imageUrl, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "10px",
                marginRight: "10px",
              }}
            >
              <img
                src={imageUrl}
                alt={`Uploaded ${index}`}
                style={{ maxWidth: "100px", marginBottom: "5px" }}
              />
              <button type="button" onClick={() => handleRemoveImage(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CloudinaryUploader;
