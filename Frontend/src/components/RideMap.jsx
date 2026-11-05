import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const bengaluru = [12.9716, 77.5946]

const locationIcon = L.divIcon({
  className: 'ride-map-marker',
  html: '<span></span>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

const DeviceLocation = ({ onChange }) => {
  const map = useMap()

  useEffect(() => {
    if (!navigator.geolocation) return

    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        const nextPosition = [coords.latitude, coords.longitude]
        onChange(nextPosition)
        map.setView(nextPosition, 15, { animate: true })
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 },
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [map, onChange])

  return null
}

const RideMap = ({ className = '', label = 'Current location' }) => {
  const [position, setPosition] = useState(null)

  return (
    <MapContainer
      center={bengaluru}
      zoom={13}
      scrollWheelZoom={false}
      className={`h-full w-full ${className}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DeviceLocation onChange={setPosition} />
      {position && (
        <Marker position={position} icon={locationIcon}>
          <Popup>{label}</Popup>
        </Marker>
      )}
    </MapContainer>
  )
}

export default RideMap