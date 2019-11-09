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
            <Dishes />
            <AddDish id={id}/>
            
            
            <div><p>.</p><p>.</p></div>
            <div><p>.</p><p>.</p></div>
            <div><p>.</p><p>.</p></div>
        </div>
      </div>
   
   
   )
  }

export default RestaurantModal

////////////////////////////////////////

function Dishes() {
  const [dishes, setDishes] = useState([])
  const [selectedDish, setSelectedDish] = useState(null)
  let {id} = useParams();

  useEffect(() => {
    fetch('http://localhost:3001/dishes')
      .then(res => res.json())
      .then(dishes => {
        debugger;
        setDishes(dishes.filter(dish => dish.restaurant_id == id))
        
      })
    //

  }, [])

  return(
    <>
    {dishes.map(
      dish => {
        return(<p>{dish.name}</p>)
      }
    )}
    </>
    )

}





///////////////////////////////////////

class AddDish extends React.Component {

  state = {
    clicked: false,
    name: "",
    errors: []
  }

  onChange = event => {
    this.setState({
      name: event.target.value
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
        name: this.state.name,
        restaurant_id: this.props.id
      })
    }).then(res => res.json())
    .then(data => {
      debugger;
      if (data.errors) {
        this.setState({
          errors: data.errors
        })
      } else {
        this.setState({
          clicked: false
        })
      }
    })
  }


  render() {
    return(
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
      }
      </>
  )}
}
