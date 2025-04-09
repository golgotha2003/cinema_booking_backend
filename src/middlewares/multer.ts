import cloudinary from "../config/cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const uuid = uuidv4();
    return {
      folder: "avatars",
      resource_type: "image",
      public_id: `avatar-${uuid}`, // Chỉ thêm tên file gốc, không thêm phần mở rộng
      transformation: { width: 300, height: 300, crop: "fill", gravity: "face" },
    };
  },
});

const movieStorage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        const {title} = req.body;
        if(!title){
            throw new Error("Title is required");
        }

        const uuid = uuidv4();
        const resourceType = file.fieldname === 'trailer' && file.mimetype.startsWith('video') ? 'video' : 'image';

        return {
            folder: "movies/${title}",
            resource_type: resourceType,
            public_id: `movie-${file.fieldname}-${uuid}`,
        }
    }
});

const uploadAvatar = multer({ storage: avatarStorage });
const uploadMovie = multer({ storage: movieStorage });

export { uploadAvatar, uploadMovie };