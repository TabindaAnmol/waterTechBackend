const reference = require("../References/customReferences.js");
const imageUpload = (folderName)=>{
  if (
    !reference.fs.existsSync(`./Public/Assets/Images/${folderName}`)
  ) {
    reference.fs.mkdirSync(`./Public/Assets/Images/${folderName}`);
  }
return ( reference.multer({
    limits:{fileSize:1024*1024*10},
    storage: reference.multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null,`./Public/Assets/Images/${folderName}`);
      },
      filename: (req, file, cb) => {
        const now = Date.now();
        console.log("Multer console")
        console.log(req.body)
        console.log("//////////////")
        console.log(file)
        cb(null,`${file.fieldname}${now}.png`)
      },
    }),
  })
  )
}

module.exports = imageUpload;
