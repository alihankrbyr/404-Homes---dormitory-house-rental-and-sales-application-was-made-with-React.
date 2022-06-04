import React from 'react'
import { Link } from 'react-router-dom'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import dormCategoryImage from '../assets/jpg/dormCategoryImage.jpeg'
import Slider from '../components/Slider'

function Explore() {
  return (
    <div className='explore'>
      <header>
        <p className="pageHeader">Explore</p>
      </header>
      <main>
        <Slider/>
        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to='/category/rent'>
            <img src={rentCategoryImage} alt="rent" className='exploreCategoryImg'/>
            
            <p className="exploreCategoryName">Places for rent</p>
          </Link>
          <Link to='/category/sale'>
            <img src={sellCategoryImage} alt="sell" className='exploreCategoryImg'/>
            <p className="exploreCategoryName">Places for sale</p>
          </Link>
          <Link to='/category/Dorm'>
            <img src={dormCategoryImage} alt="sell" className='exploreCategoryImg'/>
            <p className="exploreCategoryName">Dormitory</p>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Explore