import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps'
import {Link} from 'react-router-dom'

function Map(props){

  console.log(props)

  const {favRestaurants, restaurants, setFavState} = props
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  const belongs = (target, array) => {

    for(var i = 0; i < array.length; i++) {
      if(array[i].id === target.id) {
        return true;
      }
    }
    return false; 
  }
 


  const addToFavorites = (restaurant) => {
    let user_id = localStorage.loggedInUserId
    let restaurant_id =  restaurant.id

    fetch('http://localhost:3001/favorites', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id: user_id,
        restaurant_id: restaurant_id
      })
    })
    .then(res => res.json())
    .then(data => {
      debugger
      console.log(data.restaurantObj)
      setSelectedRestaurant(null)
      setFavState(data.restaurantObj)
    })
  }

  const unFavorite = (restaurant) => {
    let user_id = localStorage.loggedInUserId
    let restaurant_id =  restaurant.id

    fetch('http://localhost:3001/favorites', {
      method: 'DESTROY',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id: user_id,
        restaurant_id: restaurant_id
      })
    })
    .then(res => res.json())
    .then(data => {
      debugger
      console.log(data.restaurantObj)
      setSelectedRestaurant(null)
      setFavState(data.restaurantObj)
    })
  }

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

            {belongs(selectedRestaurant, favRestaurants) ? (<button onClick={()=> unFavorite(selectedRestaurant)}>Remove From Favorites</button>)  : (
              <button onClick={()=> addToFavorites(selectedRestaurant)}>Add to favorites
              </button>) 
            }
            


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
