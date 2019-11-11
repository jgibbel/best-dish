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
    hasVoted: null,
    restaurants: [],
    favRestaurants: [],
    sendFav: false
  }

  componentDidMount(){
    fetch('http://localhost:3001/restaurants')
      .then(res => res.json())
      .then(restaurants => {
        this.setState({restaurants: restaurants})
      }) 

    fetch(`http://localhost:3001/users/${localStorage.loggedInUserId}`)
      .then(res => res.json())
      .then(user => {
        console.log(user)
        debugger;
        if (user.error || user.message) {
          return
        } else {
          let favRestaurants = user.favorites.map(rest => rest.restaurantObj)
        this.setState({favRestaurants: favRestaurants})
        }
      })
  }

  componentDidUpdate(){
    
  }
  

  favoriteRestaurants = () => {
    this.setState({sendFav: true})
    // this.setState({clickedFavorites: true})
    // fetch(`http://localhost:3001/users/${localStorage.loggedInUserId}`)
    //     .then(res => res.json())
    //     .then(user => {
    //       let favRestaurants = user.favorites.map(rest => rest.restaurantObj)
    //       this.setState({favRestaurants: favRestaurants})
    //     })
  }

  allRestaurants = ()=> {
    this.setState({sendFav: false})
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

 handleVote = event => {
  console.log("vote")
  debugger
  }

  setFavState = (newRest) => {
    this.setState({favRestaurants: [...this.state.favRestaurants, newRest]})
    debugger
  }



  render() {
    const {restaurants, favRestaurants, sendFav} = this.state

    return (
      <Router>
          <HomePage setFavState={this.setFavState} favRestaurants={favRestaurants} allRest={restaurants} restaurants={sendFav ? favRestaurants : restaurants}/>
          <Switch>
            <Route exact path="/">
              { localStorage.token || this.state.loggedInUserId ? <Nav allRestaurants={this.allRestaurants} favoriteRestaurants={this.favoriteRestaurants} name={this.state.loggedInUserName}/> : <Login gotToken={this.gotToken}/> }
            </Route>
            <Route path="/:id">
              <RestaurantModal userId={this.state.loggedInUserId} handleVote={this.handleVote} />
            </Route>
        </Switch>
      </Router>
    );
  }

}
