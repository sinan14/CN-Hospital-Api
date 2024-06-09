import {
  createPatient,
  findPatient,
  createReport,
  findAllReportOfPatient,
} from './patient.repo.js';
import { ErrorHandler } from '../../../utils/errorHandler.js';

export const getPatientsAllReports = async (req, res, next) => {
  try {
    const reports = await findAllReportOfPatient(req.params.id);
    reports.forEach((report) => {
      const { patient } = report;
      report.patientCreatedBy = patient.createdBy.username;
      report.reportCreatedBy = report.createdBy.username;
      report.patientName = patient.name;
      report.patientMobile = patient.mobile;
      report.createDate = report.Date;
    });

    return res.json({ success: true, reports });
  } catch (err) {
    return next(new ErrorHandler(400, err));
  }
};

export const createPatientReport = async (req, res, next) => {
  try {
    // check patient already registered
    const data = {
      createdBy: req.userId,
      status: req.body.status,
      patient: req.params.id,
    };
    const report = await createReport(data);
    const { patient } = report;
    report.patientCreatedBy = patient.createdBy.username;
    report.reportCreatedBy = report.createdBy.username;
    report.patientName = patient.name;
    report.patientMobile = patient.mobile;
    report.createDate = report.Date;

    return res.status(201).json({ success: true, report });
  } catch (err) {
    return next(new ErrorHandler(400, err));
  }
};

export const createNewPatient = async (req, res, next) => {
  try {
    // check patient already registered
    req.body.createdBy = req.userId;
    let patient = await findPatient(req.body);
    let patientExists = true;
    // if not register patient
    if (!patient) {
      patientExists = false;
      patient = await createPatient(req.body);
    }
    return res
      .status(patientExists ? 200 : 201)
      .json({ success: true, patient });
  } catch (err) {
    //  handle error for duplicate username
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ success: false, error: 'username already registered' });
    }
    return next(new ErrorHandler(400, err));
  }
};
