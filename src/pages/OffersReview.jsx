import React from "react";
import { Container } from "react-bootstrap";
import MedicineCard from "../components/customComponents/MedicineCard"; // Ensure correct path
// import { NavBar } from "../components/sharedComponents/MyNavbar";
// import { Footer } from "../components/sharedComponents/MyFooter";

import image1 from "../assets/img1.jpg";
import image2 from "../assets/img2.jpg";
import image3 from "../assets/img3.jpg";
export const OffersReview = () => {
  const medicines = [
    { image: image1 ,  name: "Alphintern", expireDate: "12/2025" },
    { image: image2 ,  name: "Mebo", expireDate: "08/2024" },
    { image: image3 ,  name: "Panadol", expireDate: "05/2026" },
  ];

  return (
    <>
      {/* <NavBar /> */}
      <Container className="my-4">
        {/* <h3 className="text-center mb-4">Offers Review</h3> */}
        <div className="d-flex flex-column align-items-center gap-4">
          {medicines.map((med, index) => (
            <MedicineCard
              key={index}
              image={med.image}
              name={med.name}
              expireDate={med.expireDate}
            />
          ))}
        </div>
      </Container>
      {/* <Footer /> */}
    </>
  );
};

