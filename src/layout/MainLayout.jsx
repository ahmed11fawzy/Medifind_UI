import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from '../pages/Login';
import { Home } from "../pages/Home/Home";
import { OffersReview } from "../pages/OffersReview";
import { AddMedicine } from '../pages/AddMedicine';
import { RequestMedicine } from '../pages/RequestMedicine';
import { RequestsReview } from '../pages/RequestsReview';
import SharedLayout from './SharedLayout';
import { SignUp } from '../pages/signup/SignUp';
import ProtectedRoute from '../pages/ProtectedRoute'; // Import the ProtectedRoute component
import { CardPage } from "../pages/CardPage";
import { CompleteProfile } from "../pages/Home/CompleteProfile";
import { DonorPage } from "../pages/DonerPage";

export function MainLayout() {
  const token = localStorage.getItem('token'); // Check for token in local storage
  const isAuthenticated = !!token; // Determine if user is authenticated

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        
        <Route element={<SharedLayout />}>
          {/* Wrap protected routes with ProtectedRoute */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/offersReview" element={<OffersReview />} />
            <Route path="/AddMedicine" element={<AddMedicine />} />
            <Route path="/RequestMedicine" element={<RequestMedicine />} />
            <Route path="/RequestMedicine/:id" element={<RequestMedicine />} />
            <Route path="/RequestsReview" element={<RequestsReview />} />
            <Route path="/need" element={<CardPage  />} />
            <Route path="/profile" element={<CompleteProfile  />} />
            <Route path="/donate" element={<DonorPage  />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
