import ReactMapGL, {
  Marker,
  FullscreenControl,
  Popup,
  GeolocateControl
} from 'react-map-gl'

import { useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapMarker from './MapMarker'

const fullscreenControlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
}

const geolocateStyle = {
  position: 'absolute',
  bottom: 30,
  right: 0,
  margin: 10
}

const defaultLocation = {
  latitude: -34.40581053569814,
  longitude: 150.87842788963476
}

const MyStaticMap = ({ markerLat, markerLng }) => {
  const token = process.env.MAPBOX_ACCESS_TOKEN
  const [vp, setVp] = useState({
    latitude: markerLat ? markerLat : defaultLocation.latitude,
    longitude: markerLng ? markerLng : defaultLocation.longitude,
    zoom: 14,
    pitch: 50
  })

  return (
    <ReactMapGL
      {...vp}
      width="100%"
      height="640px"
      mapboxApiAccessToken={token}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={viewport => {
        setVp(vp => ({ ...vp, ...viewport }))
      }}
    >
      {markerLat && (
        <>
          <Marker longitude={markerLng} latitude={markerLat}>
            <MapMarker size={22} />
          </Marker>

          <Popup
            tipSize={5}
            anchor="bottom"
            latitude={markerLat}
            longitude={markerLng}
            closeOnClick={false}
            offsetTop={-20}
            closeButton={false}
          >
            <div
              style={{
                marginLeft: 5,
                marginRight: 5
              }}
            >
              <div>Latitude: {markerLat}</div>
              <div>Longitude: {markerLng}</div>
            </div>
          </Popup>

          <div className="fullscreen" style={fullscreenControlStyle}>
            <FullscreenControl />
          </div>

          <GeolocateControl
            style={geolocateStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation
            showUserLocation
            onViewportChange={viewport =>
              setVp(vp => ({ ...vp, ...viewport, zoom: 13 }))
            }
          />
        </>
      )}
    </ReactMapGL>
  )
}

export default MyStaticMap
