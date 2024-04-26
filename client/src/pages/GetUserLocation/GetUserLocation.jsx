import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "@/components/ui/shared/Container";
import { toast } from "sonner";

const GetUserLocation = () => {

    // get user geo location
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }
    
     // geo success 
     const geoSuccess = (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        console.log(lat, long);
    }
    // geo error 
    const geoError = (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.error("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            toast.error("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            toast.error("An unknown error occurred.");
            break;
          default:
            break;
        }
      }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const latitude = e.target.latitude.value;
        const longitude = e.target.longitude.value;
        
        const locationInfo = {
             latitude,
             longitude
        }
        console.log(locationInfo)
    }
  return (
    <section className="py-5">
        <Container className='flex justify-center'>
            <div className="flex flex-col max-w-[500px]">
                <div>
                    <form onSubmit={handleSubmitForm} className="flex items-center gap-2">
                        <Input type="text" placeholder='Latitude' name='latitude' />
                        <Input type="text" placeholder='Longitude' name='longitude' />
                        <Button type="submit">Search</Button>
                    </form>
                </div>
               
                <div className="mt-2">
                   <Button onClick={getUserLocation} className="w-full" type="submit">Current Location</Button>
                </div>
            </div>
        </Container>
    </section>
)
}

export default GetUserLocation;