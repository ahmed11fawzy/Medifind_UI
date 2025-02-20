import { useState, useEffect } from "react";
import { Container, Row, Col} from "react-bootstrap";
import { CardComponent } from "../components/customComponents/CardComponent";
import { AddBtn } from "../components/customComponents/Addbtn";
import { useNavigate } from "react-router-dom";
import { useDecoded } from "../customHooks/useDecode";
import { useGet } from "../customHooks/useGet.js";
import {useDelete} from "../customHooks/useDelete";
export const CardPage = () => {
  const navigate = useNavigate();
  const goToRequestMedicine = () => navigate("/RequestMedicine");
  const decodedToken = useDecoded();
  const baseUrl = 'http://localhost:7777/request';
  
  const { data, isLoading, serverError, getRequest } = useGet(
    decodedToken ? `${baseUrl}/${decodedToken.id}` : null
  );
  useEffect(() => {
    if (decodedToken) {
      getRequest();
    }
  }, [decodedToken]); // Add getRequest as dependency if needed
  
  const { isLoading: deleteLoading, serverError: deleteError, deleteRequest } = useDelete('http://localhost:7777/request/');
  
  const handleRemove = async (req_id) => {
    try {
      await deleteRequest(req_id);
      await getRequest();
      console.log(data)
      console.log("Request deleted successfully");
    } catch (error) {
      console.error("Failed to delete request:", error);
    }
  };
  return (
    <>
      <Row>
        {data ? data.map((item) => (
          item.medicine ? (  // Add check for medicine property
            <Col key={item._id} xs={12} md={6} lg={5} className="mb-3">
              <CardComponent
                medicine_id={item.medicine?._id}
                status={item.status}
                request_id={item._id}
                image={item.medicine?.image_path || ''}  // Add fallback
                name={item.medicine?.name || 'No name'}
                quantity={item.medicine?.concentration || ''}
                onRemove={() => handleRemovZZZe(item._id)} 
              />
            </Col>
          ) : null
        )) : <div>Nothing to display</div>}
      </Row>
    </>
  );
};

