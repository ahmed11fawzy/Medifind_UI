import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import MedicineCard from "../components/customComponents/MedicineCard"; // Ensure correct path
import { useState } from "react";
import image1 from "../assets/img1.jpg";
import image2 from "../assets/img2.jpg";
import image3 from "../assets/img3.jpg";

export  const OffersReview = () => {

  const[medicines,setMedicines]=useState([]);


useEffect(() => {
  const fetchMedicines = async () => {
    try {
      const response = await fetch("http://localhost:7777/getAllMedicine");
      console.log(response);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} - ${response.statusText}`);
      }
    
      const result = await response.json();
      const data = result.data;
      setMedicines(data); 
      console.log("Fetched Medicines:", data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  fetchMedicines();
}, []);


  
  return (
    <>
      <Container className="my-4">
        {/* <h3 className="text-center mb-4">Offers Review</h3> */}
        <div className="d-flex flex-column align-items-center gap-4">
        {Array.isArray(medicines) && medicines.map((med, index) => (

        <MedicineCard
        key={index}
        image={med.image_path ? med.image_path : image1} 
        name={med.name}
        expireDate={med.expire_date}
      />
          ))}
        </div>
      </Container>
    </>
  );
};

