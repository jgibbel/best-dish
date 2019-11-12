import React, {useState} from 'react'
import Form from './components/Form'
import './Login.css'


function Nav(props) {

    const {restaurants} = props
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearchTerm = (term)=> {
        setSearchTerm(term)
    }

    console.log("from nav bar", props)

    let restaurantsArray = restaurants.map((restaurant)=> restaurant.name )
    let afterSearchFunction = restaurantsArray.filter((rest) => {
        return rest.includes(searchTerm)

    })

    // debugger

    return(
    <div className="fixedNav">
        <p>Hello {props.name}</p>
        
        <button onClick={()=> props.fetchFavoriteRestaurants()}>Favorite Restaurants</button>
        <button onClick={()=> props.allRestaurants()}>See all</button>
        <br></br>
        <button onClick={()=> console.log("logging out")}>Logout</button>
        <Form input={searchTerm} handleSearchForm={handleSearchTerm}/>
        {afterSearchFunction.map(restaurant => <p>{restaurant}</p>)}
        
    </div>)

}

export default Nav 