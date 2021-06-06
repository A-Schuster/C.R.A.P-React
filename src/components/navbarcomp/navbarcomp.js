import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
  NavItem,
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom'
import './navbarcomp.css'
import { pages } from './pages'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/ActionCreator';


const NavBarComp = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();


  const makeNavItems = (page) => {
    if(!props.isEmployee && page.idname == 'customerissues'){
      return
    }
    return(
      <NavItem className="m-2" key={`${page.id}-${page.name}`} onClick={props.setPage} >
        <NavLink to={"/" + page.idname}>{page.page}</NavLink>
      </NavItem>
    )
  }

  const handleLogOut = (e) => {
    e.preventDefault()
    dispatch(logOut())
  }

  return(
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><img src={'assets/pictures/Icon.png'} /></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto p-2" navbar>
            {pages.map(page => makeNavItems(page))}
          </Nav>
          <NavbarText>Certified Repair And Plumbing</NavbarText>
          <span className={"navbar-text ml-auto"}>
                {!props.loggedIn && <Button outline onClick={props.handleToggle}>
                  <i className="fa fa-sign-in fa-lg" />Login
                </Button>}
                {props.loggedIn && <Button outline onClick={handleLogOut}>
                  <i className="fa fa-sign-out fa-lg" />Logout
                </Button>}
          </span>
        </Collapse>
      </Navbar>
  )
}


export default NavBarComp