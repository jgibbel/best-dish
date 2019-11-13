import React from 'react';
import {Switch, Route} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import styled from 'styled-components'
//WrappedMap component takes care of
// import { GoogleMap, withScript.js, withGoogleMap } from 'react-google-maps'
import Navbar from './components/NavBar'
import Login from './components/Login'
import MapPage from './components/MapPage'
import Default from './components/Default'
// import { data } from './data'


export default class App extends React.Component {

  //Eventually, arrange container for Map display with inline styling
  render() {
    return (
      <div>
        <Navbar/>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route exact path='/' component={MapPage}/>
          <Route component={Default}/>
        </Switch>
      </div>

    )
  }
}
