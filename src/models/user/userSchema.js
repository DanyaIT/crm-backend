const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  company: {
    type: String,
    maxlength: 50,
    required: true,
  },
  address: {
    type: String,
    maxlength: 50,
  },
  phone: {
    type: Number,
    maxlength: 15,
  },
  email: {
    type: String,
    maxlength: 50,
    required: true,
  },
  password: {
    minlength: 8,
    type: String,
    maxlength: 100,
    required: true,
  },
  refreshJWT: {
    token: {
      type: String,
      maxlength:500,
      default: ''
    },
    addedAT: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
});

module.exports = {
  UserSchema: mongoose.model("Users", UserSchema),
};
