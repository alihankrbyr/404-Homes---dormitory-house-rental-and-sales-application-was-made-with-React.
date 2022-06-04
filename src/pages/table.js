import React, {Component} from 'react';
import axios from 'axios';
import Data from './data';

export default class Table extends Component{
    constructor(props){
        super(props);
        this.state = {usersCollection: [] };
        }

    componentDidMount(){

        const options = {
        method: 'GET',
        url: 'https://real-estate12.p.rapidapi.com/listings/sale',
        params: {
            state: 'CA',
            city: 'Los Angeles',
            page: '1',
            sort: 'relevant',
            type: 'single-family,multi-family'
        },
        headers: {
            'X-RapidAPI-Host': 'real-estate12.p.rapidapi.com',
            'X-RapidAPI-Key': 'acea62fc9emsh742ce6faf716ff4p1529d8jsn69de9d7bd7a9'
        }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }

    dataT(){
        return this.state.usersCollection.map((data, i) => {
            return <dataT  obj={data} key={i} />; 
        });
    }

    render(){
        return(
            <><div className="wrapper-users">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-4 offset-md-8">
                            <form>
                                <label>Search: </label>
                                <input type="text" placeholder="Search"></input>
                            </form>
                        </div>
                    </div>
                </div>
            </div><br></br><div className='container'>
                    <table className='table table-striped table-dark'>
                        <thead className='thead-dark'>
                            <tr>
                                <td>SALE</td>
                                
                                <td>RENT</td>
                                <td>DETAILS</td>


                            </tr>
                        </thead>
                        <tbody>
                           {this.dataT()}
                            
                            
                        </tbody>
                    </table>
                </div></>
        );
    }
}