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
const OffersReview = lazy(async () => {
  const module = await import("../pages/OffersReview");
  return { default: module.OffersReview };
});
const AddMedicine = lazy(async () => {
  const module = await import("../pages/AddMedicine");
  return { default: module.AddMedicine };
});
const RequestMedicine = lazy(async () => {
  const module = await import("../pages/RequestMedicine");
  return { default: module.RequestMedicine };
});
const RequestsReview = lazy(async () => {
  const module = await import("../pages/RequestsReview");
  return { default: module.RequestsReview };
});

import { CardPage } from "../pages/CardPage";
import { CompleteProfile } from "../pages/Home/CompleteProfile";
import { DonorPage } from "../pages/DonerPage";
import { useDecoded } from "../customHooks/useDecode";
import { useEffect, useState, useMemo } from 'react';
import UpdateMedicine from "../pages/UpdateMedicine/UpdateMedicine";

import {UpdateRequest} from "../pages/UpdateRequest/UpdateRequest";

import { Loader } from "../components/customComponents/Loader/Loader";


export function MainLayout() {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;
  const decodedToken = useDecoded();
  const [isLoading, setIsLoading] = useState(true);

  // Add immediate role update when token changes
  useEffect(() => {
    const handleTokenChange = () => {
      setIsLoading(true);
      if (decodedToken !== null) {
        setIsLoading(false);
      }
    };

    handleTokenChange();
    window.addEventListener('storage', handleTokenChange);

    return () => {
      window.removeEventListener('storage', handleTokenChange);
    };
  }, [decodedToken, token]);
  const userRole = useMemo(() => {
    if (!decodedToken) return 'guest';
    return decodedToken.role?.toLowerCase() || 'guest';
  }, [decodedToken]);

  // Don't render routes until token is decoded
  if (isLoading && isAuthenticated) {
    return <Loader></Loader>;
  }

  const roleAccess = {

    doctor: ['/home', '/RequestsReview', '/OffersReview'],

  
    user: ['/home', '/AddMedicine', '/RequestMedicine', '/need', '/donate', '/profile', '/UpdateMedicine', '/UpdateRequest'],  // Remove :id


    guest: ['/', '/login', '/signup']
  };

  const isAllowedRoute = (path, role) => {
    if (!role || !roleAccess[role]) {
      console.log('Invalid role:', { role, decodedRole: decodedToken?.role });
      return false;
    }
    // Extract base path for dynamic routes
    const pathParts = path.split('/');
    const basePath = `/${pathParts[1]}`;

    const hasAccess = roleAccess[role].some(route => {
      // Check if the base path matches the allowed route
      return route.startsWith(basePath);
    });
    console.log('Access check:', {
      path,
      basePath,
      role,
      allowedRoutes: roleAccess[role],
      hasAccess
    });
    return hasAccess;
  };
  return (
    <BrowserRouter>

     
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route element={<SharedLayout />}>
            <Route element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isAllowed={isAllowedRoute}
                userRole={userRole}
              />
            }>
              {/* doctor Routes */}
              <Route path="/offersReview" element={<OffersReview />} />
              <Route path="/RequestsReview" element={<RequestsReview />} />

              {/* User Routes */}
              <Route path="/AddMedicine" element={<AddMedicine />} />
              <Route path="/UpdateMedicine/:id" element={<UpdateMedicine />} />
              <Route path="/RequestMedicine" element={<RequestMedicine />} />
              <Route path="/RequestMedicine/:id" element={<RequestMedicine />} />
              <Route path="/UpdateRequest/:request_id" element={<UpdateRequest />} />

              <Route path="/need" element={<CardPage />} />
              <Route path="/profile" element={<CompleteProfile />} />
              <Route path="/donate" element={<DonorPage />} />


              {/* Shared Routes */}
              <Route path="/home" element={<Home />} />

            </Route>

          {/* </Route> */}
        </Route>

      </Routes>


    </BrowserRouter>
  );
}
