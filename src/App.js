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
    favIDS: [],
    sendFav: false
  }

  componentDidMount(){
    fetch('http://localhost:3001/restaurants')
      .then(res => res.json())
      .then(restaurants => {
        this.setState({restaurants: restaurants})
      }) 

      if (localStorage.loggedInUserId) {
        fetch(`http://localhost:3001/users/${localStorage.loggedInUserId}`)
      .then(res => res.json())
      .then(user => {
        console.log(user)
        if (user.error){
          return
        } else {
          let favRestaurants = user.favorites.map(favorites => favorites)
          let favIDS = user.favorites.map(favorites => favorites.id)
        this.setState({favRestaurants: favRestaurants, favIDS: favIDS})
        
        }
      })
      }

    
  }

  componentDidUpdate(){
    
  }
  

  fetchFavoriteRestaurants = () => {
    this.setState({sendFav: true})
    fetch(`http://localhost:3001/users/${localStorage.loggedInUserId}`)
    .then(res => res.json())
    .then(user => {
      console.log(user)
      if (user.error){
        return
      } else {
        let favRestaurants = user.favorites.map(favorites => favorites.restaurantObj)
        let favIDS = user.favorites.map(favorites => favorites)
      this.setState({favRestaurants: favRestaurants, favIDS: favIDS})
      
      }
    })
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
  }

  setFavState = (newRest) => {
    this.setState({favRestaurants: [...this.state.favRestaurants, newRest]})
  }



  render() {
    const {restaurants, favRestaurants, sendFav, favIDS} = this.state

    return (
      <Router>
          <HomePage fetchFavoriteRestaurants={this.fetchFavoriteRestaurants} favIDS={favIDS} setFavState={this.setFavState} favRestaurants={favRestaurants} allRest={restaurants} restaurants={sendFav ? favRestaurants : restaurants}/>
          <Switch>
            <Route exact path="/">
              { localStorage.token || this.state.loggedInUserId ? <Nav restaurants={this.state.restaurants} allRestaurants={this.allRestaurants} fetchFavoriteRestaurants={this.fetchFavoriteRestaurants} name={this.state.loggedInUserName}/> : <Login gotToken={this.gotToken}/> }
            </Route>
            <Route path="/:id">
              <RestaurantModal userId={this.state.loggedInUserId} handleVote={this.handleVote} />
            </Route>
        </Switch>
      </Router>
    );
  }

}
