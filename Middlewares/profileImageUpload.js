const reference = require("../References/customReferences");
const profileImageUpload = (folderName)=>{
return ( reference.multer({
    limits:{fileSize:1024*1024*10},
    storage: reference.multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null,`./Public/Assets/Images/${folderName}`);
      },
      filename: (req, file, cb) => {
        // const now = Date.now();
        cb(null,`${file.fieldname}${req.body._id}.png`)
      },
    }),
  })
  )
}

module.exports = profileImageUpload;
