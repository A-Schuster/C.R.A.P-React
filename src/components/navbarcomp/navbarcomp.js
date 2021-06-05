import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
  NavItem,
} from 'reactstrap';
import { NavLink } from 'react-router-dom'
import './navbarcomp.css'
import { pages } from './pages'


const NavBarComp = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);


  const makeNavItems = (page) => {
    return(
      <NavItem className="m-2" key={`${page.id}-${page.name}`} onClick={props.setPage} >
        <NavLink to={"/" + page.idname}>{page.page}</NavLink>
      </NavItem>
    )
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
        </Collapse>
      </Navbar>
  )
}


export default NavBarComp