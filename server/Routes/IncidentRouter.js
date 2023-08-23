import express from 'express';
import { getIncident, getIncidents } from '../Controllers/IncidentController.js';

const router = express.Router();


// ************ PUBLIC ROUTES ************
router.get("/", getIncidents)
router.get("/:rc_number/:court_code/:institution", getIncident);



export default router;