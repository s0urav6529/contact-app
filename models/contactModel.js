const mongoose = require("mongoose");

const contactModelSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // user collection reference
    },
    name: {
      type: String,
      required: [true, "Please add the name"],
    },
    email: {
      type: String,
      required: [true, "Please add the email"],
    },
    phone: {
      type: String,
      required: [true, "Please add phone"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contact", contactModelSchema);
