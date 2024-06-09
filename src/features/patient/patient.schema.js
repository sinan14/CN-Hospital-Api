import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'patient name is requires'],
    maxLength: [30, "patient name can't exceed 30 characters"],
    minLength: [2, 'name should have atleast 2 charcters'],
  },
  mobile: {
    type: String,
    unique: true,
    required: [true, 'mobile num is required'],
    maxLength: [10, "mobile num can't exceed 10 characters"],
    minLength: [2, 'mobile num should have atleast 10 charcters'],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Doctor',
  },
  Date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const patientModel = mongoose.model('Patient', patientSchema);
export default patientModel;
