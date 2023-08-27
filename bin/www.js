const express = require('express');
const mongoose = require('mongoose');
const ongoingsRouter = require('../routes/ongoings.js')
const authRouter = require('../routes/authRouter.js')
const fileUploader = require('express-fileupload')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const authMiddleware = require('../middleware/authMiddleware.js')
const fs = require("fs");
require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express();

app.use(cors({
  credentials: true,
  origin: 'http://ongoings.adaptable.app',
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(cookieParser())
app.use(express.static('public/images'));
app.use(fileUploader({}));
app.use('/api', ongoingsRouter);
app.use('/auth', authRouter);





async function startApp() {
  try {
    await mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true, useNewUrlParser: true});
    app.listen(PORT, () => console.log("SERVER STARTED ON PORT ", PORT));
  } catch (e) {
    console.log(e);
  }
}

startApp();