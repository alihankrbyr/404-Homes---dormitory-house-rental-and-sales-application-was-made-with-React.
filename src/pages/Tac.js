
import React, { Component } from 'react'
import { Card,CardImg,Row,Button,ListGroup,ListGroupItem} from 'react-bootstrap';
export default class Tac extends Component {


  render() {
    return (
      <div className='category'>
        <header>
            <p className="pageHeader">
            Terms and Conditions
            </p>
            <>
            <Card style={{ width: '18rem' }}>
  <Card.Header>Featured</Card.Header>
  <ListGroup variant="flush">
    <ListGroup.Item>Cras justo odio</ListGroup.Item>
    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
  </ListGroup>
</Card>
</>
        </header>
        
    </div>
    )
  }
}

