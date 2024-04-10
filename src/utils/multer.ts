import multer, { diskStorage } from "multer";
import { extname } from "path";
import AppError from "./appError";

// Multer config
export default multer({
  storage: diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = extname(file.originalname);
    if (
      ext == ".jpg" ||
      ext == ".jpeg" ||
      ext == ".png" ||
      ext == ".PNG" ||
      ext == ".pdf" ||
      ext == ".doc" ||
      ext == ".docx" ||
      ext == ".gif" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "application/pdf" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      return cb(new AppError(400, "File format is not acceptable"));
    }
  },
});
