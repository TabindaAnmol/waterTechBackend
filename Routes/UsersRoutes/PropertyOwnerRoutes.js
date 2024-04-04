app.post(
  "/updateProviderProfileImage",
  profileImageUpload("Profiles").single("profileImage"),
  async (req, res) => {
    console.log("body");
    console.log(req.body);
    console.log("file");
    console.log(req.file);
    console.log("file name");
    console.log(req.file.filename);
    console.log("field name");
    console.log(req.file.fieldname);
    const isUpdated = await providerController.updateProviderProfile({
      id: req.body._id,
      profileImage: "/Profiles/" + req.file.filename,
    });
    console.log(isUpdated);
    if (isUpdated) {
      res.send({ updated: true });
    } else {
      res.send({ updated: false });
    }
  }
);