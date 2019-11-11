import React, { useState, useEffect } from 'react'
import './Login.css'
import {
  useParams, Link
} from "react-router-dom";


function RestaurantModal(props) {
  const [restaurantName, setRestaurantName] = useState(null)
  const [restaurantAddress, setRestaurantAddress] = useState(null)
  const [restaurantImage, setRestaurantImage] = useState(null)
  const [restaurantCategory, setRestaurantCategory] = useState(null)
  const [restaurantBorough, setRestaurantBorough] = useState(null)

  let {id} = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/restaurants/${id}`)
      .then(res => res.json())
      .then(rest => {
        setRestaurantName(rest.name)
        setRestaurantAddress(rest.address)
        setRestaurantImage(rest.image)
        setRestaurantCategory(rest.category)
        setRestaurantBorough(rest.borough)
      })
    //
  }, [])
    return (
      <div className="loginModal">
      <div className="modal-content">
            {/* <RestaurantCard restaurant={this.props.resaturant} /> */}
            <div className="restaurantCard">
            <Link to="/">Back</Link>
              <h3>{restaurantName}</h3>
              <p>{restaurantAddress}</p>
              <img src={restaurantImage} alt={restaurantName} width="70%"/>
              <p>{restaurantCategory}</p>
              <p>{restaurantBorough}</p>
            </div>
            <Dishes userId={props.userId} id={id}/>
            <div><p>.</p><p>.</p></div>
            <div><p>.</p><p>.</p></div>
            <div><p>.</p><p>.</p></div>
        </div>
      </div>
   
   
   )
  }

export default RestaurantModal

////////////////////////////////////////

class Dishes extends React.Component {
  state = {
    dishes: [],
    clicked: false,
    submitDishName: "",
    errors: [],
    hasVoted: null,
    data: null
  }

  async componentDidMount() {
  //     fetch(`http://localhost:3001/restaurants/${this.props.id}`)
  //     .then(res => res.json())
  //     .then(restaurant => {
  //       this.setState({
  //         dishes: restaurant.dishes
  //       })
  //        })

      const response = await fetch(`http://localhost:3001/restaurants/${this.props.id}`);
      const json = await response.json();
      this.setState({ dishes: json.dishes});
     

      fetch(`http://localhost:3001/votes`)
      .then(res => res.json())
      .then(votes => {
        const dishIds = this.state.dishes.map(dish => dish.id)
        const userVotes = votes.filter(vote => vote.user_id === parseInt(this.props.userId))
        const userVoted = userVotes.find(vote => dishIds.includes(vote.dish_id))
        if (userVoted) {
          this.setState({hasVoted: true})
        } else {
          this.setState({hasVoted: false})
        }
        console.log(this.state.hasVoted)
        
      })

        
    }

    onChange = event => {
      this.setState({
        submitDishName: event.target.value
      })
    }
  
    clicked = event => {
      this.setState({
        clicked: true
      })
    }


  dishSubmitted = (event) => {
    event.preventDefault()
    // make a fetch
    fetch("http://localhost:3001/dishes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.submitDishName,
        restaurant_id: this.props.id
      })
    }).then(res => res.json())
    .then(data => {
      if (data.errors) {
        this.setState({
          errors: data.errors
        })
      } else {
        this.setState({
          clicked: false
        })
        this.componentDidMount()
      }
    })

  }

  handleVote = event => {
    event.preventDefault()
    debugger;
      // make a fetch
      fetch("http://localhost:3001/votes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: parseInt(localStorage.loggedInUserId),
          dish_id: parseInt(event.target.value)
        })
      }).then(res => res.json())
      .then(data => {
        if (data.errors) {
          this.setState({
            errors: data.errors
          })
        } else {
          this.componentDidMount()
        }
      })
  }
  

  render(){
      return(<>

        <div className="dishesDisplay">

          {this.state.dishes.map((dish) => {
            return(
              <>
              <p>{dish.name} {dish.votes_count}</p>
              {this.state.hasVoted ? null : <button value={dish.id} onClick={this.handleVote}>Vote</button>}
              </>
            )
          })}
        </div>



        {this.state.hasVoted ? <button>Delete Vote and Add Another Dish</button> :
        <>
        { this.state.clicked 
          ? 
            <form onSubmit={ this.dishSubmitted }>
              <label  htmlFor="name">Dish Name</label>
              <input  id="name"
                      type="text"
                      onChange={ this.onChange /* for controlled form input status */ }
                      name="name"
                      value={ this.state.name /* for controlled form input status */ } />
              <input type="submit" />
            </form>
          : <button onClick={this.clicked}>Add Dish</button>
        }</>
      }

      </>)
    }

}