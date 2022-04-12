
import React, { Component } from 'react'
import { Card,CardImg,Row,Button,Col,Form} from 'react-bootstrap';

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
                <Button variant="primary" className='' type='submit'>
                  Submit
                </Button>
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

