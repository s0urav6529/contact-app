//external module
const express = require("express");
const dotenv = require("dotenv").config();
const http = require("http");

//external module
const contactRoutes = require("./routes/contactRoutes");
const errorHandler = require("./middleware/errorHandler");
const dbConnection = require("./config/dbConnection");
const userRoutes = require("./routes/userRoutes");

// use the express
const app = express();

// run the mongo serverr
dbConnection();

// create server of http
const server = http.createServer(app);

// json body parser
app.use(express.json());

app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

//error handler middleware
app.use(errorHandler);

// running the http server
server.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
