import DoctorModel from './doctor.schema.js';

export const createNewUser = async (user) => {
  return await DoctorModel.create(user);
};

export const findUserRepo = async (factor, withPassword = false) => {
  if (withPassword)
    return await DoctorModel.findOne(factor).select('+password');
  else return await DoctorModel.findOne(factor);
};
