import React from 'react';
// import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import Login from "./Login"
import HomePage from './Home'
import RestaurantModal from './RestaurantModal'
import Nav from './Nav'

export default class App extends React.Component {

  state = {
    token: null,
    loggedInUserId: null,
  }

  componentDidMount(){
    // debugger;
  }

  //Embed WrappedMap variable and set default props
  gotToken = (token, loggedInUserId) => {
   console.log("logged in", token)
   localStorage.token = token
   localStorage.loggedInUserId = loggedInUserId
   this.setState({
     token,
     loggedInUserId
   })
 }

  render() {
    return (
      <Router>
          <HomePage/>
          { localStorage.token || this.state.loggedInUserId ? <Nav /> : <Login gotToken={this.gotToken}/> }

        <Switch>

          <Route path="/:id">
            <RestaurantModal />
          </Route>
        
        </Switch>

      </Router>
    );
  }

}
