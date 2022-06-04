import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'
import {ReactComponent as Search1} from '../assets/svg/search.svg'
import {ReactComponent as DeleteIcon} from '../assets/svg/deleteIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'
import { Link } from 'react-router-dom'
function Offers() {
   
    const [searchTerm,setSearchTerm]=useState(' ')
  
    const[posts,setPosts]=useState([])

      useEffect(()=>{
          axios
          .get('http://localhost:3000/listings')
          .then(res =>{
              console.log(res)
              setPosts(res.data)
              
          })
          .catch(err=>{
              console.log(err)
          })
      }
      )
 
    
    
  return (
    <div className='category'>
        <header>
            <p className="pageHeader">
                Offers
            </p>
        </header>

        <div class="wrap">
    <div class="search">
     
      
            <input class="searchTerm" type="text" placeholder="Search..." onChange={event =>setSearchTerm(event.target.value)}>
            </input> <button type="submit" class="searchButton">
        <i ><Search1></Search1></i>
     </button>


            <ul class="searchUl" >
            
              
                 {
                 
                 posts.filter((val => {
                     if(searchTerm==" "){
                         return val 


                     }else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {return val}

                     else if (val.type.toLowerCase().includes(searchTerm.toLowerCase())) {return val}
                     
                     else if (val.location.toLowerCase().includes(searchTerm.toLowerCase())) {return val}
                     else if (val.userRef.toLowerCase().includes(searchTerm.toLowerCase())) {return val}
                })).map((val, key )=>{
                    return <div>
                        
                        <li className="categoryListing">
        <Link to={`/category/${val.type}/`} className='categoryListingLink'>
                       <img src={val.imageUrls} alt={val.name} className='categoryListingImg'/>
            <div className="categoryListingDetails">
                <p className="categoryListingLocation">
                    {val.location}
                </p>
                <p className="categoryListingName">{val.name}</p>
                <p className="categoryListingPrice">
                &#8377; {val.offer?val.discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g,',')
                    :val.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g,',')}
                    {val.type==='rent'&&' / Month'&&' Semester'}
                </p>
                <div className="categoryListingInfoDiv">
                    <img src={bedIcon} alt="bed" />
                    <p className="categoryListingInfoText">
                        {val.bedrooms>1? `${val.bedrooms}bedrooms`: '1 Bedroom'}
                    </p>
                    <img src={bathtubIcon} alt='bath' />
                    <p className="categoryListingInfoText">
                        {val.bathrooms>1? `${val.bathrooms}bathrooms`: '1 bathroom'}
                    </p>
                </div>
            </div>
            </Link>
      
      </li>    </div>;
                })}  
               


            </ul>
            
            
     
     
     
     </div>
    </div>



      
    </div>
  )
}

export default Offers