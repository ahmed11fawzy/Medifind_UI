import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Registeration } from "../pages/Registeration";
import { Login } from '../pages/Login';
// import { Home } from '../pages/Home';
import {Home} from "../pages/Home";

export function MainLayout() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<Registeration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}