import jwt from 'jsonwebtoken';
import DoctorModel from '../src/features/doctor/doctor.schema.js';
import { ErrorHandler } from '../utils/errorHandler.js';

export const auth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token || token == 'null') {
    return next(new ErrorHandler(401, 'login to access this route!'));
  }
  const decodedData = await jwt.verify(token, process.env.JWT_Secret);
  const user = await DoctorModel.findById(decodedData.id);
  req.userId = user._id;
  next();
};
