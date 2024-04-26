import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect, useMemo, useState } from 'react'
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl'
import { toast } from 'sonner'
import Pin from './Pin'
import 'mapbox-gl/dist/mapbox-gl.css'

const TOKEN =
  'pk.eyJ1IjoiYWxhbWluODczMyIsImEiOiJjbHZndnd5MHYwdmllMmtwNTBjMDA4Ymk2In0.QVTrogk-akJwfVR2rHEV-g'
const GetUserLocation = () => {
  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
    range: 1000,
  })
  const [nearestAres, setNearestAreas] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [popupInfo, setPopupInfo] = useState(null)
  console.log(popupInfo)
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
      setIsLoading(true)
      const res = await fetch(
        `http://localhost:2600/api/v1/geo/poi?latitude=${location.latitude}&longitude=${location.longitude}&range=${location.range}`,
      )
      const data = await res.json()
      setNearestAreas(data.result.elements)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error.message)
    }
  }

  const pins = useMemo(
    () =>
      nearestAres.map((city, index) => {
        return (
          <Marker
            key={`marker-${index}`}
            longitude={city.lon}
            latitude={city.lat}
            anchor='bottom'
            onClick={e => {
              // If we let the click event propagates to the map, it will immediately close the popup
              // with `closeOnClick: true`
              e.originalEvent.stopPropagation()
              setPopupInfo(city)
            }}
          >
            <Pin />
          </Marker>
        )
      }),
    [nearestAres],
  )
  // console.log(pin)
  useEffect(() => {
    if (location.latitude) {
      getNearestData()
    }
  }, [location.latitude])
  return (
    <section className=''>
      <div className='grid grid-cols-12 gap-5 lg:flex-row'>
        <div className='flex flex-col w-full col-span-4 m-2'>
          <div>
            <form
              onSubmit={handleSubmitForm}
              className='flex items-center gap-2'
            >
              <Input
                defaultValue={location.latitude}
                type='text'
                placeholder='Latitude'
                name='latitude'
              />
              <Input
                defaultValue={location.longitude}
                type='text'
                placeholder='Longitude'
                name='longitude'
              />
              <Input
                defaultValue={location.range}
                type='text'
                placeholder='Range'
                name='range'
              />
              <Button type='submit'>
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
            </form>
          </div>

          <div className='mt-2'>
            <Button onClick={getUserLocation} className='w-full' type='submit'>
              Current Location
            </Button>
          </div>
        </div>
        {/* nearest data */}

        <div className='col-span-8'>
          <Map
            mapLib={import('mapbox-gl')}
            initialViewState={{
              latitude: 25.1634,
              longitude: 92.0175,
              zoom: 7,
              bearing: 0,
              pitch: 0,
            }}
            mapStyle='mapbox://styles/mapbox/dark-v9'
            style={{ width: '100%', height: '100vh' }}
            mapboxAccessToken={TOKEN}
          >
            <GeolocateControl position='top-left' />
            <FullscreenControl position='top-left' />
            <NavigationControl position='top-left' />
            <ScaleControl />

            {pins}

            {popupInfo && (
              <Popup
                anchor='top'
                longitude={Number(popupInfo.longitude)}
                latitude={Number(popupInfo.latitude)}
                onClose={() => setPopupInfo(null)}
              >
                <div>
                  {popupInfo.city}, {popupInfo.state} |{' '}
                  <a
                    target='_new'
                    href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
                  >
                    Wikipedia
                  </a>
                </div>
                <img width='100%' src={popupInfo.image} />
              </Popup>
            )}
          </Map>
        </div>
      </div>
    </section>
  )
}

export default GetUserLocation
