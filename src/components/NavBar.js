import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
//
import logo from '../cutlery.svg'
import { ButtonContainer } from './Button'

export default class Navbar extends React.Component {

  render(){
    return (
      <NavWraper className='navbar navbar-expand-sm  bg-primary navbar-dark px-sm-5'>
      <Link to='/'>
        <img src={logo} alt='home'/>
      </Link>
      <ul className='navbar-nav align-tems-center'>
        <li className='nav-item ml-5'>
          <Link to='/' className='nav-link'>
            Search
          </Link>
        </li>
      </ul>
      <Link to='/cart' className='ml-auto'>
        <ButtonContainer>
          <span className='mr-2'>
            <i className='fas fa-cart-plus' />
          </span>
           Favorites
        </ButtonContainer>
      </Link>
      </NavWraper>
    )
  }
}


const NavWraper = styled.nav`
  background: var(--mainBlue) !important;
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform : capitalize;
  }

`
