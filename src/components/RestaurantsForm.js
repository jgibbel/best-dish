import React from 'react'
import styled from 'styled-components'


export default class RestaurantsForm extends React.Component {

  state = {
    location: '',
    category: ''
  }

  onChangeLocation = (e) => {
    let location = e.target.value
    this.setState({
      location
    })
  }

  onChangeCategory = (e)=> {
    let category = e.target.value
    this.setState({
      category
    })
  }



  render(){
    return (
      <FormDiv>
          <form className="form" id="search-form" action="index.html" method="post">
          <div className='row'>
            <div className="col">
              <label htmlFor="">Query by Borough</label>
              <select name="location" id="" defaultValue={'DEFAULT'} onChange={this.onChangeLocation} >
                <option value="DEFAULT" disabled>Select a location</option>
                <option value="manhattan">Manhattan</option>
                <option value="queens">Queens</option>
                <option value="brooklyn">Brooklyn</option>
                <option value="bronx">Bronx</option>
                <option value="statenisland">Staten Island</option>
                </select>
              </div>
              <div className='col'>
                <label htmlFor="">Restaurant Category</label>
                <select name="category" id="" defaultValue={'DEFAULT'} onChange={this.onChangeCategory}>
                  <option value="DEFAULT" disabled >Category</option>
                  <option value="brunch">Brunch</option>
                  <option value="burger">Burger</option>
                  <option value="mexican">Mexican</option>
                  <option value="pizza">Pizza</option>
                  <option value="sushi">Sushi</option>
                </select>
              </div>
              <div className='col'>
                <input type="submit" name="submit" value="Submit"/>
              </div>
            </div>
          </form>
      </FormDiv>
    )
  }
}
const FormDiv = styled.div`
.row{
  margin: auto;
  width: 50%;
  border: 3px solid green;
  padding: 10px;
  margin-top: 10px
  text-align: center;
}

.col {

}

`
