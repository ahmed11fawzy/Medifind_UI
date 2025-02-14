// hooks/useMedicineForm.js

import { useState } from "react";

const useMedicineForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: URL.createObjectURL(file) });
      setErrors({ ...errors, image: "" });
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData({ ...formData, image: URL.createObjectURL(file) });
      setErrors({ ...errors, image: "" });
    }
  };
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Only letters and spaces are allowed";
    }

    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.image) newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    handleChange,
    handleImageUpload,
    handleDrop,
    validateForm,
    setFormData,
  };
};

export default useMedicineForm;
