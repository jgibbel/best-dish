import React, { useState, useEffect } from 'react'
import './Login.css'
import {
  useParams, Link
} from "react-router-dom";


function RestaurantModal() {
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
            <Dishes id={id}/>
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
    errors: []
  }

  componentDidMount() {
      fetch(`http://localhost:3001/restaurants/${this.props.id}`)
      .then(res => res.json())
      .then(restaurant => {
        this.setState({
          dishes: restaurant.dishes
        })
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
  

  render(){
      return(<>
        <div className="dishesDisplay">
          {this.state.dishes.map((dish) => {
            return(
              <p>{dish.name} {dish.votes_count}</p>
            )
          })}
        </div>
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
        }

      </>)
    }

}