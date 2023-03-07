require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const app = express();

var corsOptions = {
  origin: "http://localhost:5000",
  optionsSuccessStatus: 200,
  cretentials: true,
};

//middlewares

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//rutas
app.use("/user", require("./routes/users.routes"));
app.use("/api", require("./routes/upload.routes"));
app.use("/api", require("./routes/products.routes"));

//database
const URI = process.env.MONGODB_URL;
mongoose.set("strictQuery", false); //para eliminar mensaje de alerta de mongo
mongoose.connect(URI, {}, (err) => {
  if (err) throw err;
  console.log("Connected to mongoDB");
});



//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running", PORT);
});
