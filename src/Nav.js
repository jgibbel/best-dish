import React from 'react'
import './Login.css'


function Nav(props) {


    return(
    <div className="fixedNav">
        <p>Hello {props.name}</p>
        <p>Filter select here</p>
        <button onClick={()=> props.favoriteRestaurants()}>Favorite Restaurants</button>
        <button onClick={()=> props.allRestaurants()}>See all</button>
    </div>)

}

export default Nav 