import React from 'react';
import { WrappedMap } from './components/Map'


export default class HomePage extends React.Component {

  render(){

    return(
      <div style={{width: '100vw', height: '100vw'}}>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=`}
          loadingElement={<div style={{ height: '100%'}} />}
          containerElement={<div style={{ height: '100%'}} />}
          mapElement={<div style={{height: '100%'}} />}
          />
        </div>

    )
  }
}
