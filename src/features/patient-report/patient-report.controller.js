import { filterByStatusRepo } from './patient-report.repo.js';
import { ErrorHandler } from '../../../utils/errorHandler.js';

export const filterByStatus = async (req, res, next) => {
  try {
    const reports = await filterByStatusRepo(req.params.status);
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
