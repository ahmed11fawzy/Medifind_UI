
import { Footer } from '../components/sharedComponents/MyFooter'
import { NavBar } from '../components/sharedComponents/MyNavbar'
import { Outlet } from 'react-router-dom'
export default function SharedLayout() {
  return (
   <>
   <NavBar/>
   <Outlet/>
   <Footer/>
   
   </>
  )
}
