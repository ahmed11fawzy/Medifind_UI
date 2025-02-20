import { Footer } from '../components/sharedComponents/MyFooter'
import { NavBar } from '../components/sharedComponents/MyNavbar'
import { Outlet } from 'react-router-dom'
export default function SharedLayout() {
  return (
   <>
   <NavBar/>
   <div className="container mt-5 ">
  <div className="row ">
   <div className='col-sm-12 col-lg-10'>
   <Outlet/>
   </div>
   </div>
  
  </div>
  
   <Footer/>
   
   </>
  )
}