
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "image-uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowType = /jpeg|jpg|png|webp/;
  const extname = allowType.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowType.test(file.mimetype);

  if (extname && mimetype) cb(null, true);
  else cb(new Error("Only images are allowed"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

