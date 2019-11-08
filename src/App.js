import React from 'react';
import {Switch, Route} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components'
//WrappedMap component takes care of
// import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'
import Navbar from './components/NavBar'
import MapPage from './components/MapPage'
import Default from './components/Default'
// import { data } from './data'


export default class App extends React.Component {

  //Eventualy, arrange container for Map display with inline styling
  render() {
    return (
      <>
        <Navbar/>
          <Switch>
            <Route exact path='/' component={MapPage}/>
            <Route component={Default}/>
          </Switch >
      </>
    );
  }





  // Ideally we will have our state set in this component, so we can pass data to different component
  //
  // state = {
  //   restaurants: null
  // }

  // componentDidMount(){
  //   this.setState({
  //     restaurants: data
  //   }, () => console.log(this.state.restaurants))
  // }

  //Embed WrappedMap variable and set default props


}



//
