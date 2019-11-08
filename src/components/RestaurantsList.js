import React from 'react'
import styled from 'styled-components'



export default class RestaurantsList extends React.Component {

  render(){
    return (
      <ListDiv>
      <div className='restaurants-list'>
        <h2>List of restaurants</h2>
        <ul>
          <li>Restaurant 1</li>
          <li>Restaurant 2</li>
        </ul>
      </div>
      </ListDiv>

    )
  }
}

const ListDiv = styled.div`
.restaurants-list {
  border: 3px solid green;
  width: 30vw;
  height: 40vw;
  margin: auto;
  padding: 10px 10px 10px 10px;
  float: left
}
`
