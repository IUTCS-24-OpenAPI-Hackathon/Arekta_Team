import { NextFunction, Request, Response } from 'express';
import attractionServices from '../services/attraction.service';

const handleAddAttraction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { image, description, review, comment, experience } = req.body;
    const attractionPayload = {
      image,
      description,
      review,
      comment,
      experience,
    };
    const attraction =
      await attractionServices.createAttractionIntoDB(attractionPayload);

    res.status(201).json({
      success: true,
      message: 'Successfully create user attraction!',
      attraction,
    });
  } catch (error) {
    next(error);
  }
};

const attractionControllers = {
  handleAddAttraction,
};
export default attractionControllers;
