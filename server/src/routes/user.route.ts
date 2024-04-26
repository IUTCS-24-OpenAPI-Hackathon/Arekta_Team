import express from 'express';
import userControllers from '../controllers/user.controller';

const router = express.Router();

router.post("/users", userControllers.handleCreateNewUser)


const userRoutes = router;
export default userRoutes;
