import React, { Component } from 'react'

export class PostForm extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         userId:' ',
         title:' ',
         body:' '
      }
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit=(e)=>{
        console.log(this.state)
    }
  render() {
      const{userId,title,body}=this.state
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
              <div>
                  <label>
                      User Id
                  </label>
                  <input type='text'
                  name='userID'
                  value={userId}
                  onChange={this.handleChange}
                  
                  
                  > </input>
              </div>
              <div>
                  <label>
                      User Title
                  </label>
                  <input type='text'
                  name='Title'
                  value={title}
                  onChange={this.handleChange}
                  
                  
                  > </input>
              </div>
              <div>
                  <label>
                      User Body
                  </label>
                  <input type='text'
                  name='Body'
                  value={body.userBody}
                  onChange={this.handleChange}
                  
                  
                  > </input>
              </div>
              <div>
                  <button type='submit'>Submit</button>
              </div>
          </form>


      </div>
    )
  }
}

export default PostForm