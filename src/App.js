import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'


function Map(){
  //Create default canvas usind GoogleMap component and stablish default values
 return (
   <GoogleMap
     defaultZoom={13}
     defaultCenter={{ lat: 40.768520, lng: -73.9559102 }}
   />
 );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function App() {
  //Embed WrappedMap variable and set default props
  return (
    <div style={{width: '100vw', height: '100vw'}}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: '100%'}} />}
        containerElement={<div style={{ height: '100%'}} />}
        mapElement={<div style={{height: '100%'}} />}
      />
    </div>
  );
}
