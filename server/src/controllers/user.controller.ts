import { NextFunction, Request, Response } from 'express';
import userServices from '../services/user.service';

const handleCreateNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;
    const user = await userServices.createNewUserIntoDB(name, email, password);
    res.status(201).json({
      success: true,
      message: 'successfully created new user',
      user,
    });
  } catch (error) {
    next(error);
  }
};

const handleSignInUser=async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const { email,password } = req.body;
    const user = await userServices.signInUserIntoDB(email,password)
    res.status(200).json({
      success: true,
      message: 'successfully sign in user',
      user,
    });
  } catch (error) {
    next(error);
  }
}

const userControllers = {
  handleCreateNewUser,
  handleSignInUser
};
export default userControllers;
