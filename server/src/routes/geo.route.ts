import express from 'express';
import geoControllers from '../controllers/geo.controller';

const router = express.Router();

router.get('/geo/poi', geoControllers.handleGetPointOfInterest);

router.get('/weather-details', geoControllers.handleGetCurrentWeather);

const geoRoutes = router;
export default geoRoutes;
