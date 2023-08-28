// external module
const asyncHandler = require("express-async-handler");

// internal module
const contactmodel = require("../models/contactModel");

//@desc get all the contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await contactmodel.find({ userid: req.user.id });
  res.status(200).json(contacts);
});

//@desc get the contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await contactmodel.find({
    $and: [{ _id: req.params.id }, { userid: req.user.id }],
  });
  if (!Object.keys(contact).length) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc create new contacts
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const savedObject = {
    userid: req.user.id,
    name,
    email,
    phone,
  };
  console.log(savedObject);
  const contact = await contactmodel.create(savedObject);
  res.status(200).json(contact);
});

//@desc update contacts
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await contactmodel.find({
    $and: [{ _id: req.params.id }, { userid: req.user.id }],
  });

  // maybe contact not exits or user have not permisson to update other contact
  if (!Object.keys(contact).length) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updatedContact = await contactmodel.findByIdAndUpdate(
    req.params.id,
    req.body
  );

  res.status(200).json(updatedContact);
});

//@desc delete contacts
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await contactmodel.find({
    $and: [{ _id: req.params.id }, { userid: req.user.id }],
  });

  //maybe contact not exits or user have not permisson to update other contact
  if (!Object.keys(contact).length) {
    res.status(404);
    throw new Error("Contact not found");
  }
  console.log(contact);

  const deletedcontact = await contactmodel.deleteOne({ _id: req.params.id });
  res.status(200).json(deletedcontact);
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
