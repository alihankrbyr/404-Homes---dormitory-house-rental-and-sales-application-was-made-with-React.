import React, {Component} from 'react';

class Data extends Component{
    render(){
        return(
            <tr>
                <td>{this.props.obj.sale}</td>
                <td>{this.props.obj.rent}</td>
                <td>{this.props.obj.details}</td>
            </tr>
        )
    }
}
export default Data;