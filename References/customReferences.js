const jwtPrivateKey = "Anmols";
const publishableKey =
  "pk_test_51NMV2mFcBkByFRfMAInUnzM6kGwNomh5o4toRTnah6EdjxSFkorc2lbeVKrqy6y1zj0JVq1x7SqjRzplgsPuZ1TM00WCs1MZto";
const secretKey =
  "sk_test_51NMV2mFcBkByFRfMd2UkhR6AlsWhNYYt256rqG3vD31MRBvEfYtXqgzhrPtQ5ITJyboHx7M1u4geX2umSxiZXE5z00JeoN6PFC";
const baseUrl = "http://192.168.63.161:8000";
//(Global Modules)
const path = require("path");
const fs = require("fs");

//Packages(Local Modules)
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const formdata = multer();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const stripe = require("stripe")(secretKey);


module.exports = {
  path: path,
  fs: fs,
  express: express,
  mongoose: mongoose,
  multer: multer,
  formdata: formdata,
  cors: cors,
  jwt: jwt,
  bcrypt: bcrypt,
  jwtPrivateKey: jwtPrivateKey,
  stripe: stripe,
  publishableKey: publishableKey,
};
