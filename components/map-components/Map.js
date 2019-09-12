import { useState, useEffect, useRef } from 'react'
import ReactMapGL, {
  Marker,
  NavigationControl,
  FullscreenControl,
  FlyToInterpolator,
  LinearInterpolator,
  GeolocateControl
} from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'
import MapMarker from './MapMarker'
import ControlPanel from './ControlPanel'

const fullscreenControlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
}

const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
}

const geolocateStyle = {
  position: 'absolute',
  bottom: 30,
  right: 0,
  margin: 10
}

const Map = ({ view, setView, marker, setMarker }) => {
  const token = process.env.MAPBOX_ACCESS_TOKEN
  const { markerLat, markerLng } = marker

  return (
    <ReactMapGL
      {...view}
      width="100%"
      height="100%"
      mapboxApiAccessToken={token}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={viewport => setView({ ...view, ...viewport })}
      onClick={e => console.log(e)}
    >
      <Marker
        longitude={markerLng}
        latitude={markerLat}
        draggable
        onDragEnd={({ lngLat: [markerLng, markerLat] }) =>
          setMarker({ markerLat, markerLng })
        }
      >
        <MapMarker size={22} />
      </Marker>

      <div className="fullscreen" style={fullscreenControlStyle}>
        <FullscreenControl />
      </div>
      <div className="nav" style={navStyle}>
        <NavigationControl />
      </div>

      <GeolocateControl
        style={geolocateStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation
        showUserLocation
        onViewportChange={viewport =>
          setView({ ...view, ...viewport, zoom: 13 })
        }
      />

      <ControlPanel lat={markerLat} lng={markerLng} />
    </ReactMapGL>
  )
}

export default Map
