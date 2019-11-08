import React from 'react'
// import styled from 'styled-components'
//
import RestaurantsForm from './RestaurantsForm'
import  MapDiv from './MapDiv'
import RestaurantsList from './RestaurantsList'



export default class MapPage extends React.Component {

  //Eventualy, arrange container for Map display with inline styling
  render() {

    return (
      <>
        <RestaurantsForm/>
        <div style={{width: "500px"}}>
          <MapDiv/>
          <RestaurantsList/>
        </div>
      </>
    )
  }
}
