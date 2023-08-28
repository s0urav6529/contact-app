const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const dbConnection = async () => {
  await mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log(`Database connection established!`))
    .catch((err) => console.log());
};

module.exports = dbConnection;
