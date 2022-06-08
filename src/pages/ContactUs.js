
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/svg/logo2.jpg'
import { Card,ListGroup} from 'react-bootstrap'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
export default class ContactUs extends Component {


  render() {
    return (
      <div className='categoryListingDetails'>
        <header><center>
            <p className="card2 pageHeader">
            CONTACT US
            </p></center>
            <>
            <Card className="card2" style={{align: 'center'}} >
            <div align="center">
            <img src={logo} style={{width: '10rem',marginLeft:'-2%'}} alt="404 Homes " />
        </div>
  <ListGroup as="ul">
 

  

  <Card.Header className='listTacHeader' style={{marginTop:'2rem',marginBottom:'1rem'}}>  <form id='contact-form' noValidate>
                {/* Row 1 of form */}
                <div className=' formRow'>
                  <div className='col-6'>
                    <input
                      type='text'
                      name='name'
                      className='form-control formInput'
                      placeholder='Name'
                    ></input>
                  </div>
                  <div className='col-6'>
                    <input
                      type='email'
                      name='email'
                      className='form-control formInput'
                      placeholder='Email address'
                    ></input>
                  </div>
                </div>
                {/* Row 2 of form */}
                <div className='row formRow'>
                  <div className='col'>
                    <input
                      type='text'
                      name='subject'
                      className='form-control formInput'
                      placeholder='Subject'
                    ></input>
                  </div>
                </div>
                {/* Row 3 of form */}
                <div className='row formRow'>
                  <div className='col'>
                    <textarea
                      rows={3}
                      name='message'
                      className='form-control formInput'
                      placeholder='Message'
                    ></textarea>
                  </div>
                </div>
               
          <div className=" signInBar">
            <p className="signInText">Send Message</p>
            <Link to='/profile' style={{marginLeft:'20px'}} className='card2 forgotPasswordLink' ><button className='signInButton'><ArrowRightIcon fill='white' width='45px' height='44px'/> </button></Link>
          </div>
          
        
        
        
                
              </form></Card.Header>





</ListGroup>
</Card>
</>
        </header>
        
    </div>
    )
    }}