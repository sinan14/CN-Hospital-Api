import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { urlencoded } from 'express';
import path from 'path';
import doctorRoutes from './src/features/doctor/doctor.routes.js';
import patientRoutes from './src/features/patient/patient.routes.js';
import patientReportRoutes from './src/features/patient-report/patient-report.routes.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';

dotenv.config({ path: '.env' });

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.static(path.resolve('public')));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// configure routes
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/reports', patientReportRoutes);

// errorHandlerMiddleware
app.use(errorHandlerMiddleware);

export default app;
