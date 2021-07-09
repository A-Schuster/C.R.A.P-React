import React, {useState} from 'react'
import NavBarComp from "./navbarcomp/navbarcomp"
import { Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label } from 'reactstrap';
import { handleLogin } from '../redux/ActionCreator';
import { useDispatch } from 'react-redux'

const Header = (props) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()

  const handleToggle = () => isModalOpen ? setModalOpen(false) : setModalOpen(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = ({
      username: e.target[0].value,
      password: e.target[1].value,
      checked: e.target[2].value
    })
    dispatch(handleLogin(user))
  }

  return(
    <div className={"header"}>
      <NavBarComp isEmployee={props.isEmployee} loggedIn={props.loggedIn} handleToggle={handleToggle}/>
      <Modal isOpen={isModalOpen} toggle={handleToggle}>
          <ModalHeader toggle={handleToggle}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor='username'>Username</Label>
                <Input type="text" id="username"  name="username"/>
              </FormGroup>
              <FormGroup>
                <Label htmlFor='password'>Password</Label>
                <Input type="password" id="password" name="password"/>
              </FormGroup>
              <FormGroup check>
                <Label check htmlFor='username'>
                  <Input type='checkbox'  name='remember'/>
                  Remember Me
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">Login</Button>
            </Form>
          </ModalBody>
        </Modal>
    </div>
  )
}

export default Header