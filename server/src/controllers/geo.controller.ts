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
                        node["amenity"](around:${range},${latitude},${longitude});
                        node["tourism"](around:${range},${latitude},${longitude});
                        node["place"](around:${range},${latitude},${longitude});
                    );
                    out geom;
                `),
    });

    const result = await overpassReq.json();

    // sanitizing the data for client
    for (let i = 0; i < result.elements.length; i++) {
      const tagsPropertyNames = Object.keys(result.elements[i].tags).filter(
        function (propertyName) {
          return propertyName.indexOf('name') === 0;
        },
      );
      let name =
        tagsPropertyNames.length > 0
          ? result.elements[i].tags[tagsPropertyNames[0]]
          : 'Unnamed Mystery!';
      if (tagsPropertyNames.includes('name:en'))
        name = result.elements[i].tags['name:en'];
      result.elements[i].tags.name = name;
    }

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
