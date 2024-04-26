import express from 'express';
import userControllers from '../controllers/user.controller';

const router = express.Router();

router.post("/users", userControllers.handleCreateNewUser)


const geoRoutes = router;
export default geoRoutes;
