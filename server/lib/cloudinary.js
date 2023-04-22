import cloudinary from 'cloudinary';

// cloudinary.config({
//   cloud_name: 'dorandev',
//   api_key: '797549999278382',
//   api_secret: 'ThtgVkqc-9d9WSuEY6s_RE6WWyA',
// });
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

function uploads(file, folder) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          public_id: result.public_id,
          url: result.url,
        });
      },
      {
        resource_type: 'auto',
        folder: folder,
      }
    );
  });
}

export { uploads, cloudinary };
