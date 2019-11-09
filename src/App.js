import React from 'react';
// import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'
import { data } from './data'
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import Login from "./Login"
import HomePage from './Home'
import RestaurantModal from './RestaurantModal'

export default class App extends React.Component {

  state = {
    token: null,
    loggedInUserId: null,
    restaurant: null
  }

  // componentDidMount(){
  //   this.setState({
  //     restaurants: data
  //   }, () => console.log(this.state.restaurants))
  // }

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
        <Switch>
          <Route exact path="/" render={(props) => <HomePage/> }/>
          <Route exact path="/login" render={(props) => <Login {...props} gotToken={this.gotToken}/>}/>
        </Switch>
        { this.state.restaurant ? <RestaurantModal restaurant={this.state.restaurant}/> : null }
      </Router>
    );
  }

}
