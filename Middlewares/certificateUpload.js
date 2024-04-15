const { now } = require("mongoose");
const reference = require("../References/customReferences");
const certificateUpload = (folderName) => {
  if (
    !reference.fs.existsSync(`./Public/Assets/Pdfs/${folderName}`)
  ) {
    reference.fs.mkdirSync(`./Public/Assets/Pdfs/${folderName}`);
  }

  return reference.multer({
    limits: { fileSize: 1024 * 1024 * 10 },
    storage: reference.multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null,`./Public/Assets/Pdfs/${folderName}`);
      },
      filename: (req, file, cb) => {
        cb(null, `${ Date.now()}${file.fieldname}.pdf`);
      },
    }),
  });
};

module.exports = certificateUpload;
