import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps'
import {Link} from 'react-router-dom'

function Map(){
  const [restaurants, setRestaurants] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/restaurants')
      .then(res => res.json())
      .then(restaurants => {
        setRestaurants(restaurants)

      })
    //

  }, [])

 return (
   <GoogleMap
     defaultZoom={13}
     defaultCenter={{ lat: 40.712772, lng: -74.006058 }}
    >
      { restaurants.map(restaurant => (< Marker
        key={restaurant.id}
        position={{
          lat: parseFloat(restaurant.latitude),
          lng: parseFloat(restaurant.longitude)
        }}
        onClick={ () => {
          setSelectedRestaurant(restaurant)
        }}
        />
      ))}

      { selectedRestaurant && (
        < InfoWindow
        position={{
          lat: parseFloat(selectedRestaurant.latitude),
          lng: parseFloat(selectedRestaurant.longitude)
        }}
        onCloseClick={() => setSelectedRestaurant(null) }
        >
          <div>
            <h2>{selectedRestaurant.name}</h2>
            <p>{selectedRestaurant.address}</p>
            <p>{selectedRestaurant.category}</p>
            <Link to={"/" + selectedRestaurant.id} >See best dishes</Link>

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
