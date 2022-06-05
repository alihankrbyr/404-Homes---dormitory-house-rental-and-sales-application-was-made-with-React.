
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Card,CardImg,Row,Button,Col,Form} from 'react-bootstrap';
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
export default class ContactUs extends Component {


  render() {
    return (
      <div className='category'>
          <div className='center'>
        <header>
            <p className="pageHeader">
            Contact Us 
            </p>
            <div className='ContactForm'>
      <div className='container'>
        <div className='row'>
          <div className='col-12 text-center'>
            <div className='contactForm'>
              <form id='contact-form' noValidate>
                {/* Row 1 of form */}
                <div className='row formRow'>
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
               
          <div className="signInBar">
            <p className="signInText">Send Message</p>
            <Link to='/profile' className='forgotPasswordLink' ><button className='signInButton'><ArrowRightIcon fill='white' width='45px' height='44px'/> </button></Link>
          </div>
        
        
        
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
        </header>
        </div>
    </div>
    )
  }
}

