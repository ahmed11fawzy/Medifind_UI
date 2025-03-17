import { useState } from "react";

export const useAddMedicineForm = () => {
  const [medicineName, setMedicineName] = useState("");
  const [numPieces, setNumPieces] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [concentration, setConcentration] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!medicineName.trim()) {
      newErrors.medicineName = "Medicine name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(medicineName.trim())) {
      newErrors.medicineName = "Only letters are allowed.";
    }

    // Fix number validation
    if (!numPieces) {
      newErrors.numPieces = "Number of pieces is required.";
    } else if (!/^\d+$/.test(String(numPieces))) {
      newErrors.numPieces = "Only numbers are allowed.";
    }

    if (!expireDate) {
      newErrors.expireDate = "Expire date is required.";
    } else {
      const selectedDate = new Date(expireDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate <= today) {
        newErrors.expireDate = "Expire date must be in the future.";
      }
    }

    if (!concentration?.trim()) {
      newErrors.concentration = "Concentration is required.";
    } else if (!/^\d+\s?(mg|g|ml|mcg|kg)$/i.test(concentration.trim())) {
      newErrors.concentration = "Invalid format (e.g., 100 mg).";
    }

    if (!image) {
      newErrors.image = "Image is required.";
    } else if (!/\.(jpg|jpeg|png)$/i.test(image.name)) {
      newErrors.image = "Only JPG and PNG formats are allowed.";
    }

    if(image){
      if(!/\.(jpg|jpeg|png)$/i.test(image.name)){

      }
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    medicineName,
    numPieces,
    expireDate,
    concentration,
    errors,
    setMedicineName,
    setNumPieces,
    setExpireDate,
    setConcentration,
    setImage,
    validateForm,
  };
};
