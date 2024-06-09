import { ErrorHandler } from '../../../utils/errorHandler.js';
import { sendToken } from '../../../utils/sendToken.js';
import { createNewUser, findUserRepo } from './doctor.repository.js';

export const createNewDoctor = async (req, res, next) => {
  try {
    const newUser = await createNewUser(req.body);
    await sendToken(newUser, req, res, 200);
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

export const doctorLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return next(new ErrorHandler(400, 'please enter username/password'));
    }
    const doctor = await findUserRepo({ username }, true);
    if (!doctor) {
      return next(
        new ErrorHandler(401, 'doctor not found! register yourself now!!')
      );
    }
    const passwordMatch = await doctor.comparePassword(password);
    if (!passwordMatch) {
      return next(new ErrorHandler(401, 'Invalid username or password!'));
    }
    await sendToken(doctor, req, res, 200);
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const logoutDoctor = async (req, res) => {
  res
    .status(200)
    .cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({ success: true, msg: 'logout successful' });
};
