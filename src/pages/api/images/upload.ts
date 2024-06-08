
import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '../../../cloudinaryConfig';
import { Readable } from 'stream';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
       return res.status(405).json({ error: "Method not allowed." });
    }
   
    const file = req.files?.file; 
   
    if (!file) {
       return res.status(400).json({ error: "No files received." });
    }
   
    const fileStream = Readable.from(file.data);
   
    try {
       const result = await new Promise((resolve, reject) => {
         const uploadStream = cloudinary.uploader.upload_stream(
           { resource_type: "image", public_id: file.name.replaceAll(" ", "_") },
           (error, result) => {
             if (error) reject(error);
             else resolve(result);
           }
         );
         fileStream.pipe(uploadStream);
       });
   
       return res.status(201).json({ Message: "Success", status: 201, url: result.secure_url });
    } catch (error) {
       return res.status(500).json({ Message: "Failed", status: 500 });
    }
   }