import patientReportModel from '../patient-report/patient-report.schema.js';

export const filterByStatusRepo = async (status) => {
  return await patientReportModel
    .find({ status })
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
