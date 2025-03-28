const cloudinary = require("../configs/cloudinary");

async function uploadToCloudinary(fileBuffer, format) {
  if (!fileBuffer) {
    throw new Error("File buffer is missing. Please provide a valid file.");
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { 
        folder: "user_profiles", 
        resource_type: "image",
        format: format || undefined 
      },
      (error, result) => {
        if (error) {
          return reject(new Error("Cloudinary upload failed: " + error.message));
        }
        resolve(result.secure_url);
      }
    );

    uploadStream.end(fileBuffer);
  });
}

module.exports = { uploadToCloudinary };
