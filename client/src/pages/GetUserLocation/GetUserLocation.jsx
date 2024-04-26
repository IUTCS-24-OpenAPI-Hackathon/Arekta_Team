import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Container from '@/components/ui/shared/Container'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import NearestData from './NearestData'

const GetUserLocation = () => {
  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
    range: 1000,
  });
  const [nearestAres, setNearestAreas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
 
  // get user geo location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
    } else {
      console.log('Geolocation is not supported by this browser.')
    }
  }

  // geo success
  const geoSuccess = position => {
    const lat = position.coords.latitude
    const long = position.coords.longitude
    setLocation(prev => ({
      ...prev,
      latitude: lat,
      longitude: long,
    }))
  }
  // geo error
  const geoError = error => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        toast.error('User denied the request for Geolocation.')
        break
      case error.POSITION_UNAVAILABLE:
        toast.error('Location information is unavailable.')
        break
      case error.TIMEOUT:
        toast.error('The request to get user location timed out.')
        break
      case error.UNKNOWN_ERROR:
        toast.error('An unknown error occurred.')
        break
      default:
        break
    }
  }

  const handleSubmitForm = e => {
    e.preventDefault()
    const latitude = e.target.latitude.value
    const longitude = e.target.longitude.value
    const range = e.target.range.value

    setLocation(prev => ({
      ...prev,
      latitude: latitude,
      longitude: longitude,
      range: range,
    }))
    
  }

  const getNearestData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `http://localhost:2600/api/v1/geo/poi?latitude=${location.latitude}&longitude=${location.longitude}&range=${location.range}`,
      )
      const data = await res.json();
      setNearestAreas(data.result.elements);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message)
    }
  }
  useEffect(() => {
    if (location.latitude) {
      getNearestData()
    }
  }, [location.latitude])
  return (
    <section className='py-5'>
      <Container className='flex flex-col items-center justify-center'>
        <div className='flex flex-col max-w-[500px]'>
          <div>
            <form
              onSubmit={handleSubmitForm}
              className='flex items-center gap-2'
            >
              <Input defaultValue={location.latitude} type='text' placeholder='Latitude' name='latitude' />
              <Input defaultValue={location.longitude} type='text' placeholder='Longitude' name='longitude' />
              <Input defaultValue={location.range} type='text' placeholder='Range' name='range' />
              <Button type='submit'>{isLoading ? "Searching...": "Search"}</Button>
            </form>
          </div>

          <div className='mt-2'>
            <Button onClick={getUserLocation} className='w-full' type='submit'>
              Current Location
            </Button>
          </div>
        </div>
        {/* nearest data */}

        <div className='w-full max-w-[500px] flex-col flex mt-5'>
          {nearestAres.map((nearestArea, index) => (
            <NearestData key={index} nearestArea={nearestArea} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default GetUserLocation
