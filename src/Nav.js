import React from 'react'
import './Login.css'


function Nav(props) {


    return(
    <div className="fixedNav">
        <p>Hello {props.name}</p>
        <p>Filter select here</p>
    </div>)

}

export default Nav 