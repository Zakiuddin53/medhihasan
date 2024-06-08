// import { v2 as cloudinary } from "cloudinary";
// import { NextApiRequest } from "next";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function uploadImage(file: File): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream((error, result) => {
//       if (error) reject(error);
//       else if (result) resolve(result.secure_url);
//       else reject(new Error("Upload result is undefined"));
//     });
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       stream.end(Buffer.from(reader.result as string));
//     };
//     reader.readAsArrayBuffer(file);
//   });
// }
