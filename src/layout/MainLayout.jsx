import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from '../pages/Login';
import { SignUp } from '../pages/signup/SignUp';
import { ProtectedRoute } from '../pages/ProtectedRoute';
import { Suspense, lazy } from 'react';
import SharedLayout from "../layout/SharedLayout"; 

const Home = lazy(async () => {
  const module = await import("../pages/Home/Home");
  return { default: module.Home };
});
const OffersReview =  lazy(async () => {
  const module = await import("../pages/OffersReview");
  return { default: module.OffersReview };
});
const AddMedicine = lazy(async () => {
  const module = await import("../pages/AddMedicine");
  return { default: module.AddMedicine };
});
const RequestMedicine =  lazy(async () => {
  const module = await import("../pages/RequestMedicine");
  return { default: module.RequestMedicine };
});
const RequestsReview =  lazy(async () => {
  const module = await import("../pages/RequestsReview");
  return { default: module.RequestsReview };
});

export function MainLayout() {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  return (
    <BrowserRouter>
      <Suspense fallback={<h2 style={{ textAlign: "center" }}>Loading...</h2>}>
        <Routes>
     
          <Route path="/" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route element={<SharedLayout />}>
            <Route 
              element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/home" element={<Home />} />
              <Route path="/offersReview" element={<OffersReview />} />
              <Route path="/AddMedicine" element={<AddMedicine />} />
              <Route path="/RequestMedicine" element={<RequestMedicine />} />
              <Route path="/RequestsReview" element={<RequestsReview />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
