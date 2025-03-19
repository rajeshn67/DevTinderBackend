const validator = require("validator");

const validatesignUpData = (req) => {
  const { firstname, lastname,emailId,password} = req.body;
  if (!firstname || !lastname) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password");
  }
};

const validateEditProfileData = (req) => {
   const allowedEditfields=
    [ "firstname",
      "lastname",
      "emailId",
      "photoURL",
      "Gender",
      "age",
      "about",
      "skills"];

     const isEditAllowed= Object.keys(req.body).every((field) => allowedEditfields.includes(field));
   return isEditAllowed;
}
module.exports = { validatesignUpData,validateEditProfileData };