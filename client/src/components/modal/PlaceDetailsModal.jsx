/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'

const PlaceDetailsModal = ({
  latitude,
  longitude,
  openModal,
  setOpenModal,
}) => {
  const [placeData, setPlaceData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
console.log(longitude)
  const placeDataFetch = async () => {
    try {
      //   setIsLoading(true)
      const res = await fetch(
        `http://localhost:2600/api/v1/place-details/?latitude=${latitude}&longitude=${longitude}`,
      )
      const data = await res.json()
      console.log(data)
      setPlaceData(data.result.localityInfo.administrative[2])
      //   setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error.message)
    }
  }
  useEffect(() => {
    if (latitude) {
      placeDataFetch()
    }
  }, [latitude])

  return (
    <Dialog open={openModal} onOpenChange={() => setOpenModal(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Place Data</DialogTitle>
          <DialogDescription>
            <h3>Name : {placeData.isoName}</h3>
            <h3>Description : {placeData.description}</h3>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default PlaceDetailsModal
