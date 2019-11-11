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
    loggedInUserName: null,
    hasVoted: null
  }

  componentDidMount(){
    // debugger;
  }

  //Embed WrappedMap variable and set default props
  gotToken = (token, loggedInUserId, loggedInUserName) => {
   console.log("logged in", token)
   localStorage.token = token
   localStorage.loggedInUserId = loggedInUserId
   localStorage.loggedInUserName = loggedInUserName
   this.setState({
     token,
     loggedInUserId,
     loggedInUserName
   })
 }


  render() {
    return (
      <Router>
          <HomePage/>
          <Route exact path="/">
          { localStorage.token || this.state.loggedInUserId ? <Nav name={this.state.loggedInUserName}/> : <Login gotToken={this.gotToken}/> }
          </Route>
        <Switch>

          <Route path="/:id">
            <RestaurantModal userId={this.state.loggedInUserId} />
          </Route>

          
        
        </Switch>

      </Router>
    );
  }

}
