const CLOUDINARY_URL = "https://res.cloudinary.com/<your-cloud-name>/image/upload/";

export const buildCloudinaryURL = (publicId: string, options = ""): string => {
  return `${CLOUDINARY_URL}${options}${publicId}`;
};
