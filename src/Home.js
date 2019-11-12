import React from 'react';
import { WrappedMap } from './components/Map'



export default class HomePage extends React.Component {

  

  render(){
    const API_KEY = process.env.REACT_APP_GOOGLE_KEY

    return(
      <div style={{width: '100vw', height: '100vw'}}>
        <WrappedMap
          fetchFavoriteRestaurants={this.props.fetchFavoriteRestaurants}
          favIDS={this.props.favIDS}
          setFavState={this.props.setFavState}
          allRest={this.props.allRest}
          favRestaurants={this.props.favRestaurants} 
          restaurants={this.props.restaurants}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=`}
          loadingElement={<div style={{ height: '100%'}} />}
          containerElement={<div style={{ height: '100%'}} />}
          mapElement={<div style={{height: '100%'}} />}
          />
        </div>

    )
  }
}
