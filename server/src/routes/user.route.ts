import express from 'express';
import userControllers from '../controllers/user.controller';

const router = express.Router();

router.post("/users/register", userControllers.handleCreateNewUser)

router.get("/users/login", userControllers.handleSignInUser)


const userRoutes = router;
export default userRoutes;
