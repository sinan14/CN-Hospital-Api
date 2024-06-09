import express from 'express';
import { auth } from '../../../middlewares/auth.js';
import { filterByStatus } from './patient-report.controller.js';

const router = express.Router();
router.use(auth);
router.get('/:status', filterByStatus);

export default router;
