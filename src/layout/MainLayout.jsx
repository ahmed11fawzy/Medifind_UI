import React from 'react';
import { BrowserRouter , Routes, Route, Navigate } from "react-router-dom";
import { Registeration } from "../pages/Registeration";
import { Login } from '../pages/Login';
// import { Home } from '../pages/Home';
import {Home} from "../pages/Home";
import {OffersReview} from "../pages/OffersReview"
import { AddMedicine } from '../pages/AddMedicine';
import { RequestMedicine } from '../pages/RequestMedicine';
import SharedLayout from './SharedLayout';

export function MainLayout() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Registeration />} />
        <Route path="/register" element={<Registeration />} />
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