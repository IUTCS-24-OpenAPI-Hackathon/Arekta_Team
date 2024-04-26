import express from 'express';
import geoControllers from '../controllers/geo.controller';

const router = express.Router();

router.get('/geo/poi', geoControllers.handleGetPointOfInterest);

router.get('/current-weather', geoControllers.handleGetCurrentWeather);

router.get('/place-details', geoControllers.handleGetPlaceDetails);

const geoRoutes = router;
export default geoRoutes;
