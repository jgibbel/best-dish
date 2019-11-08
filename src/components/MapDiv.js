import React from 'react'
import styled from 'styled-components'
//
import { WrappedMap } from './Map'


export default class MapDiv extends React.Component {

  render(){

    return (
      <MapContainer className='container'>
        <div className='map-container'>
          <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=`}
            loadingElement={<div style={{ height: '100%'}} />}
            containerElement={<div style={{ height: '100%'}} />}
            mapElement={<div style={{height: '100%'}} />}
          />
        </div>
      </MapContainer>
    )
  }

}


const MapContainer = styled.div`
.map-container {
  border: 3px solid green;
  width: 50vw;
  height: 50vw;
  margin: auto;
  float: left
}

`
//${process.env.REACT_APP_GOOGLE_KEY}
