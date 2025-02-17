import React from 'react'
import { Footer } from '../components/sharedComponents/MyFooter'
import { NavBar } from '../components/sharedComponents/MyNavbar'
import { Outlet } from 'react-router-dom'
import { MySideBar } from '../components/sharedComponents/MySideBar'
export default function SharedLayout() {
  return (
   <>
   <NavBar/>
   <div className="container mt-5 ">
  <div className="row ">
   <div className='col-sm-12 col-lg-10'>
   <Outlet/>
   </div>
   <div className="col-2 d-none d-lg-block  mt-5">
   <MySideBar style={{'backgroundColor':'#bcb8b8ed'}} ></MySideBar>
   </div>
   </div>
  
  </div>
  
   <Footer/>
   
   </>
  )
}
