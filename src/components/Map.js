import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { data } from '../data'

function Map(){

  const [restaurants, setRestaurants] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  useEffect(() => {
    setRestaurants(data)
  }, [])


 return (
   <GoogleMap
     defaultZoom={10}
     defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
    >
      { restaurants.map(restaurant => (< Marker
        key={restaurant.properties.PARK_ID}
        position={{
          lat: restaurant.geometry.coordinates[1],
          lng: restaurant.geometry.coordinates[0]
        }}
        onClick={() => setSelectedRestaurant(restaurant) }
        />
      ))}

      { selectedRestaurant && (
        < InfoWindow
        position={{
          lat: selectedRestaurant.geometry.coordinates[1],
          lng: selectedRestaurant.geometry.coordinates[0]
        }}
        onCloseClick={() => setSelectedRestaurant(null) }
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
