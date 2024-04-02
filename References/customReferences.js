const jwtPrivateKey="Anmols"
const baseUrl='http://192.168.63.161:8000'
//(Global Modules)
const path = require("path");
const fs = require("fs");

//Packages(Local Modules)
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const formdata = multer();
const cors = require("cors");
const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs');



module.exports = {
  path: path,
  fs: fs,
  express: express,
  mongoose: mongoose,
  multer: multer,
  formdata: formdata,
  cors: cors,
  jwt:jwt,
  bcrypt:bcrypt,
  jwtPrivateKey:jwtPrivateKey,
};
