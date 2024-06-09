import express from 'express';
import { auth } from '../../../middlewares/auth.js';
import {
  createNewDoctor,
  doctorLogin,
  logoutDoctor,
} from './doctor.controller.js';

const router = express.Router();

router.route('/register').post(createNewDoctor);
router.route('/login').post(doctorLogin);

router.route('/logout').get(auth, logoutDoctor);

export default router;
