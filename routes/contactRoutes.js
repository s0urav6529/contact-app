const express = require("express");
const {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getContacts,
} = require("../controllers/contactControllers");
const validateToken = require("../middleware/validateTokenHandler");

const contactRoutes = express.Router();

contactRoutes
  .route("/")
  .get(validateToken, getContacts)
  .post(validateToken, createContact);

contactRoutes
  .route("/:id")
  .get(validateToken, getContact)
  .put(validateToken, updateContact)
  .delete(validateToken, deleteContact);

module.exports = contactRoutes;
