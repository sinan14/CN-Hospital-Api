import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'user name is requires'],
    maxLength: [30, "user name can't exceed 30 characters"],
    minLength: [2, 'name should have atleast 2 charcters'],
  },

  password: {
    type: String,
    required: [true, 'Please enter your password'],
    select: false,
  },
  Date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

doctorSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  //  hash user password with cost of 12 before saving using bcrypt
  this.password = await bcrypt.hash(this.password, 12);
});

// JWT Token
doctorSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_Secret, {
    expiresIn: process.env.JWT_Expire,
  });
};
// user password compare
doctorSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const DoctorModel = mongoose.model('Doctor', doctorSchema);
export default DoctorModel;
