import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { data } from '../data'
 
function Map(){
  const [selectedPark, setSelectedPark] = useState(null)

 return (
   <GoogleMap
     defaultZoom={10}
     defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
    >
      { data.map(park => (< Marker
        key={park.properties.PARK_ID}
        position={{
          lat: park.geometry.coordinates[1],
          lng: park.geometry.coordinates[0]
        }}
        onClick={ () => {
          setSelectedPark(park)
        }}
        />
      ))}

      { selectedPark && (
        < InfoWindow
        position={{
          lat: selectedPark.geometry.coordinates[1],
          lng: selectedPark.geometry.coordinates[0]
        }}
        onCloseClick={() => setSelectedPark(null) }
        >
          <div>
            <h2>Restaurant Name</h2>
            <p>Restaurant Address</p>
            <p>Restaurant Price</p>
            <button>Click me!</button>

          </div>


        </InfoWindow>
      )}

   </GoogleMap>
 );
}

export const WrappedMap = withScriptjs(withGoogleMap(Map));



// Create default canvas usind GoogleMap component and stablish default values
// Create WrappedMap variable and assign it to a function imported from 'react-google-maps'
// withScriptjs() takes withGoogleMap() as a callback wich has the return of Map()
// import Marker and change its attributes based on each choice
// /* Use of hooks*/
