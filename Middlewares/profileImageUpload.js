const reference = require("../References/customReferences");
const profileImageUpload = (folderName) => {
  let imagePath = `./Public/Assets/Images/Profiles/${folderName}`;
  if (
    !reference.fs.existsSync(`./Public/Assets/Images/Profiles/${folderName}`)
  ) {
    reference.fs.mkdirSync(`./Public/Assets/Images/Profiles/${folderName}`);
  }

  return reference.multer({
    limits: { fileSize: 1024 * 1024 * 10 },
    storage: reference.multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, imagePath);
        // cb(null,`./Public/Assets/Images/Profiles/${folderName}`);
      },
      filename: (req, file, cb) => {
        // const now = Date.now();
        cb(null, `${file.fieldname}${req.body._id}.png`);
      },
    }),
  });
};

module.exports = profileImageUpload;
