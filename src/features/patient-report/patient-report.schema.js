import mongoose from 'mongoose';

const patientReportSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: [
      'Negative',
      'Travelled-Quarantine',
      'Symptoms-Quarantine',
      'Positive-Admit',
    ],
  },

  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Patient',
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

const patientReportModel = mongoose.model('PatientReport', patientReportSchema);
export default patientReportModel;
