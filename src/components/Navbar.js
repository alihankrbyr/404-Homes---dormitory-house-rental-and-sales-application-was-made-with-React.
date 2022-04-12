import React from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import {ReactComponent as OfferIcon} from '../assets/svg/localOfferIcon.svg'
import {ReactComponent as ExploreIcon} from '../assets/svg/exploreIcon.svg'
import {ReactComponent as PersonOutlineIcon} from '../assets/svg/personOutlineIcon.svg'
import {ReactComponent as TacIcon} from '../assets/svg/TacIcon.svg'

import '../index.css'


function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const changeColor = (route)=>{
        if(route === location.pathname){
            return true;
        }
    }
  return (
   <footer className='navbar'>
       <nav className='navbarNav'>
           <ul className='navbarListItems'>
               <li className='navbarListItem' onClick={()=>navigate('/')}>
                   <ExploreIcon fill={changeColor('/')?'#1f1f1f':'#4e4e4e'} width='36px' height='36px' />
                   <p className={changeColor('/')?'navbarListItemNameActive':'navbarListItem'}>Explore</p>
               </li>
               <li className='navbarListItem' onClick={()=>navigate('/offers')}>
                   <OfferIcon fill={changeColor('/offers')?'#1f1f1f':'#4e4e4e'} width='36px' height='36px' />
                   <p className={changeColor('/offers')?'navbarListItemNameActive':'navbarListItem'}>Offers</p>
               </li>
               <li className='navbarListItem'  onClick={()=>navigate('/Tac')}>
                   <TacIcon fill={changeColor('/Tac')?'#1f1f1f':'#4e4e4e'} width='36px' height='36px'/>
                   <p className={changeColor('/Tac')?'navbarListItemNameActive':'navbarListItem'}>TAC</p>
               </li>
               <li className='navbarListItem'  onClick={()=>navigate('/ContactUs')}>
                   <TacIcon fill={changeColor('/ContactUs')?'#1f1f1f':'#4e4e4e'} width='36px' height='36px'/>
                   <p className={changeColor('/ContactUs')?'navbarListItemNameActive':'navbarListItem'}>contact</p>
               </li>
               <li className='navbarListItem'  onClick={()=>navigate('/profile')}>
                   <PersonOutlineIcon fill={changeColor('/profile')?'#1f1f1f':'#4e4e4e'} width='36px' height='36px'/>
                   <p className={changeColor('/profile')?'navbarListItemNameActive':'navbarListItem'}>Profile</p>
               </li>
           </ul>
       </nav>
   </footer>
  )
}

export default Navbar