import Attraction from '../models/attraction.model';

//attraction payload interface
interface AttractionPayload {
  image: string;
  description: string;
  review?: string;
  comment?: string;
  experience?: string;
}
const createAttractionIntoDB = async (attractionPayload: AttractionPayload) => {
  const attraction = await Attraction.create({ attractionPayload });
  return attraction;
};

const attractionServices = {
  createAttractionIntoDB,
};
export default attractionServices;
