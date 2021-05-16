import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
  NavItem,
  NavLink
} from 'reactstrap';
import './navbarcomp.css'
import { pages } from './pages'


const NavBarComp = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);


  const handleActive = (e) => {
    const oldActive = pages.filter(page => page.active === true);
    const filter = pages.filter(page => page.idname === e.target.id)
    filter[0].active = true;
    oldActive[0].active = false
  }

  const makeNavItems = (page) => {
    if(page.active){
      return(
        <NavItem key={`${page.id}-${page.name}`} active onClick={props.setPage} >
          <NavLink id={page.idname}>{page.page}</NavLink>
        </NavItem>
      )
    }
    else{
      return(
        <NavItem key={`${page.id}-${page.name}`} onClick={props.setPage} >
          <NavLink id={page.idname}>{page.page}</NavLink>
        </NavItem>
      )
    }
  }

  return(
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><img src={'../../pictures/Icon.png'} /></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav onClick={handleActive} className="mr-auto p-2" navbar>
            {pages.map(page => makeNavItems(page))}
          </Nav>
          <NavbarText>Certified Repair And Plumbing</NavbarText>
        </Collapse>
      </Navbar>
  )
}


export default NavBarComp