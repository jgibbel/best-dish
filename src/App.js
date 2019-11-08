import React from 'react';
// import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'
import { WrappedMap } from './components/Map'
import { data } from './data'

export default class App extends React.Component {

  state = {
    restaurants: null
  }

  componentDidMount(){
    this.setState({
      restaurants: data
    }, () => console.log(this.state.restaurants))
  }

  //Embed WrappedMap variable and set default props
  render() {
    return (
      <div style={{width: '100vw', height: '100vw'}}>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=`}
          loadingElement={<div style={{ height: '100%'}} />}
          containerElement={<div style={{ height: '100%'}} />}
          mapElement={<div style={{height: '100%'}} />}
        />
      </div>
    );
  }

}
