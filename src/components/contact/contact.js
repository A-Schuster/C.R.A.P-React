import React from 'react';
import { Button,Label, Col, Row } from 'reactstrap';
import { Control, Form, Errors, actions} from 'react-redux-form'
import { ContactWrapper } from '../../Styles';
import { useDispatch, useSelector } from 'react-redux'
import { postIssue } from '../../redux/ActionCreator'


const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);
const isNumber = val => !isNaN(+val);
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)


const Contact = () => {
  const dispatch = useDispatch(actions.reset('feedbackForm'))
  const currentUser = useSelector(state => state.currentUser)

  const handleSubmit = () => {
    const firstName = document.getElementById('firstName') 
    const lastName = document.getElementById('lastName') 
    const phoneNum = document.getElementById('phoneNum') 
    const email = document.getElementById('email') 
    const complaint = document.getElementById('complaint')
    const username = currentUser.currentUser[0].username
    dispatch(postIssue(firstName.value,lastName.value,phoneNum.value,email.value,complaint.value,username))
    dispatch(actions.reset('feedbackForm'))
  }
    return (
        <ContactWrapper className="container">
            <div className="row">
                <div className="col">
                    <h2>Contact Us</h2>
                </div>
            </div>
            <div className="row row-content">
                    <div className="col-12">
                        <hr />
                    </div>
                    <div className="col-md-10">
                    <Form model="feedbackForm" onSubmit={handleSubmit}> 
                            <Row className={'form-group'}>
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text  model=".firstName" id="firstName" validators={{
                                      required,
                                      minLength: minLength(2),
                                      maxLength: maxLength(15)
                                    }} name="firstName"
                                        placeholder="First Name" className="form-control"/>
                                    <Errors className="text-danger" model=".firstName" show="touched" component='div' messages={{
                                      required: 'Required',
                                      minLength: "Must be at least 2 characters",
                                      maxLength: 'Must be 15 characters or less'
                                    }}/>
                                </Col>
                            </Row>
                            <Row className={'form-group'}>
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastName" validators={{
                                      required,
                                      minLength: minLength(2),
                                      maxLength: maxLength(15)
                                    }} id="lastName" name="lastName"
                                        placeholder="Last Name" className="form-control" />
                                    <Errors className="text-danger" model=".lastName" show="touched" component='div' messages={{
                                    required: 'Required',
                                    minLength: "Must be at least 2 characters",
                                    maxLength: 'Must be 15 characters or less'
                                  }}/>
                                </Col>
                            </Row>
                            <Row className={'form-group'}>
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Control.text  model=".phoneNum" validators={{
                                      required,
                                      minLength: minLength(10),
                                      maxLength: maxLength(15),
                                      isNumber
                                    }} id="phoneNum" name="phoneNum"
                                        placeholder="Phone number" className="form-control"/>
                                    <Errors className="text-danger" model=".phoneNum" show="touched" component='div' messages={{
                                    required: 'Required',
                                    minLength: "Must be at least 10 numbers",
                                    maxLength: 'Must be 15 numbers or less',
                                    isNumber: 'Must be a number'
                                  }}/>
                                </Col>
                            </Row>
                            <Row className={'form-group'}>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email" validators={{
                                          required,
                                          validEmail
                                        }} className="form-control"/>
                                    <Errors className="text-danger" model=".email" show="touched" component='div' messages={{
                                    required: 'Required',
                                    validEmail: 'Invalid email address'
                                  }}/>
                                </Col>
                            </Row>
                            <Row className={'form-group'}>
                                <Col md={{size: 4, offset: 2}}>
                                    <div className='form-check'>
                                        <Label check>
                                            <Control.checkbox 
                                                model=".sms"
                                                name="sms" 
                                                className="form-check-input" />
                                            <strong>Can we text you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <Control.select name="contactType"
                                            model=".contactType"
                                            className="form-control">
                                        <option>By Phone</option>
                                        <option>By Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className={'form-group'}>
                                <Label htmlFor="complaint" md={2}>How can we help?</Label>
                                <Col md={10}>
                                    <Control.textarea id="complaint" name="complaint"
                                        model=".complaint"
                                        rows="10" 
                                        className="form-control"/>
                                </Col>
                            </Row>
                            <Row className={'form-group'}>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </ContactWrapper>
        );
}
export default Contact;