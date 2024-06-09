import patientModel from './patient.schema.js';
import patientReportModel from '../patient-report/patient-report.schema.js';

export const createPatient = async (data) => {
  const patient = await patientModel.create(data);
  return patient;
};

export const findPatient = async (factor) => {
  return await patientModel
    .findOne(factor)
    .populate({
      path: 'patient',
      select: {
        name: 1,
        mobile: 1,
        createdBy: 1,
      },
      populate: {
        path: 'createdBy',
        select: {
          username: 1,
        },
      },
    })
    .populate('createdBy');
};

export const createReport = async (data) => {
  const report = await new patientReportModel(data).save();

  await report.populate({
    path: 'patient',
    select: {
      name: 1,
      mobile: 1,
      createdBy: 1,
    },
    populate: {
      path: 'createdBy',
      select: {
        username: 1,
      },
    },
  });

  await report.populate({
    path: 'createdBy',
    select: {
      username: 1,
    },
  });

  // Convert the Mongoose document to a plain JavaScript object
  const reportObject = report.toObject();

  return reportObject;
};
export const findAllReportOfPatient = async (id) => {
  return await patientReportModel
    .find({ patient: id })
    .populate({
      path: 'patient',
      select: {
        name: 1,
        mobile: 1,
        createdBy: 1,
      },
      populate: {
        path: 'createdBy',
        select: {
          username: 1,
        },
      },
    })
    .populate({
      path: 'createdBy',
      select: {
        username: 1,
      },
    })
    .lean();
};
