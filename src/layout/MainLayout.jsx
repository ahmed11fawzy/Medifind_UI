
import { BrowserRouter , Routes, Route,  } from "react-router-dom";
import { Login } from '../pages/Login';
// import { Home } from '../pages/Home';
import {Home} from "../pages/Home";
import {OffersReview} from "../pages/OffersReview"
import { AddMedicine } from '../pages/AddMedicine';
import { RequestMedicine } from '../pages/RequestMedicine';
import SharedLayout from './SharedLayout';
import { SignUp } from '../pages/signup/SignUp';

export function MainLayout() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route  element={<SharedLayout />}>
             <Route path="/home" element={<Home />} />
             <Route path="/offersReview" element={<OffersReview />} />
             <Route path="/AddMedicine" element={<AddMedicine />} />
             <Route path="/RequestMedicine" element={<RequestMedicine />} />
           

        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}