import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

    const USERNAME=process.env.DB_username;
const PASSWORD=process.env.DB_password;
const storage=new GridFsStorage({


   url:`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.qjzcyiy.mongodb.net/`,
   

   file:(request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.mimeType) === -1) 
        // f(match.indexOf(file.mimeType) === -1)
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});
export default multer({storage}); 