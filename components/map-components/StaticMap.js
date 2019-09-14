import { Marker, StaticMap, Popup } from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'
import MapMarker from './MapMarker'

const defaultLocation = {
  latitude: -34.40581053569814,
  longitude: 150.87842788963476
}

const MyStaticMap = ({ markerLat, markerLng }) => {
  const token = process.env.MAPBOX_ACCESS_TOKEN

  return (
    <StaticMap
      latitude={markerLat ? markerLat : defaultLocation.latitude}
      longitude={markerLng ? markerLng : defaultLocation.longitude}
      zoom={15}
      pitch={50}
      width="100%"
      height="640px"
      mapboxApiAccessToken={token}
      mapStyle="mapbox://styles/mapbox/streets-v11"
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
        </>
      )}
    </StaticMap>
  )
}

export default MyStaticMap
