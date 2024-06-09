import express from 'express';
import { auth } from '../../../middlewares/auth.js';
import {
  createNewPatient,
  createPatientReport,
  getPatientsAllReports,
} from './patient.controller.js';

const router = express.Router();
router.use(auth);
router.route('/register').post(createNewPatient);
router.post('/:id/create_report', createPatientReport);
router.get('/:id/all_reports', getPatientsAllReports);

export default router;
