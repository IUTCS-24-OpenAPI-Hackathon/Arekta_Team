import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

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
                        node["amenity"](around:${range},${latitude},${longitude});
                        node["tourism"](around:${range},${latitude},${longitude});
                        node["place"](around:${range},${latitude},${longitude});
                    );
                    out geom;
                `),
    });

    const result = await overpassReq.json();

    const elements = [];
    // sanitizing the data for client
    for (let i = 0; i < result.elements.length; i++) {
      const tagsPropertyNames = Object.keys(result.elements[i].tags).filter(
        function (propertyName) {
          return propertyName.indexOf('name') === 0;
        },
      );
      if (tagsPropertyNames.length == 0) continue;

      let name =
        tagsPropertyNames.length > 0
          ? result.elements[i].tags[tagsPropertyNames[0]]
          : 'Unnamed Mystery!';
      if (tagsPropertyNames.includes('name:en'))
        name = result.elements[i].tags['name:en'];
      result.elements[i].tags.name = name;
      elements.push(result.elements[i]);
    }
    result.elements = elements;

    res.status(httpStatus.OK  ).json({
      success: true,
      message: 'Successfully retrieved POI around the lat long!',
      result,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetCurrentWeather = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const appid = 'fbe36884ea5883d9fcde03d17b9cf6bf';
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appid}`,
    );

    res.status(httpStatus.OK).json({
      success: true,
      message: 'Successfully Retrieved Current Weather Details!',
      result: await result.json(),
    });
  } catch (error) {
    next(error);
  }
};

const geoControllers = {
  handleGetPointOfInterest,
  handleGetCurrentWeather,
};
export default geoControllers;
