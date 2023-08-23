import Incidents from "../Models/IncidentModel.js";
import asyncHandler from "express-async-handler";


const getIncidents = asyncHandler(async(req, res) =>{
  try {
      const incidents = await Incidents.find({});
      res.json(incidents);
  } catch (error) {
      res.status(400).json({message: error.message});
  }
});




const getIncident = asyncHandler(async(req, res) =>{
    try {
    const rc_number = req.params.rc_number;
    const court_code = req.params.court_code;
    const institution = req.params.institution;
    const incident = await Incidents.findOne({ rc_number, court_code, institution }).exec();
    if (incident) {
      res.json(incident);
    } else {
      res.status(404).json({ message: 'Incident introuvable' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});



export {getIncident, getIncidents};