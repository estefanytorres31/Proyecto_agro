import {v2 as cloudinary} from 'cloudinary';
const path = require('path');
const fs = require ('fs');

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });

export async function uploadImage(filePath) {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'qr'
    })
}

export async function deleteImage(secure_url) {
    const urlParts = secure_url.split('/');
    const fileNameWithExtension = urlParts[urlParts.length - 1];
    const public_id = `prueba/${fileNameWithExtension.split('.')[0]}`;
    
    return await cloudinary.uploader.destroy(public_id);
}
          

  export const uploadDocument = (filePath, originalName) => {
    const public_id = path.parse(originalName).name;
  const extension = path.parse(originalName).ext;
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, { resource_type: "raw", public_id: `${public_id}${extension}`,folder:'prueba2' }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

