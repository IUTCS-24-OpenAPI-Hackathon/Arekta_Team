import { NextFunction, Request, Response } from 'express';

const handleGetPointOfInterest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const range = req.query.range;

    const overpassReq = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body:
        'data=' +
        encodeURIComponent(`
                    [out:json]
                    [timeout:90]
                    ;
                    (
                        node["tourism"](around:${range},${latitude},${longitude});
                        node["place"](around:${range},${latitude},${longitude});
                    );
                    out geom;
                `),
    });

    const result = await overpassReq.json();

    res.status(200).json({
      success: true,
      message: 'Successfully retrieved POI around the lat long!',
      result,
    });
  } catch (error) {
    next(error);
  }
};

const geoControllers = {
  handleGetPointOfInterest,
};
export default geoControllers;
