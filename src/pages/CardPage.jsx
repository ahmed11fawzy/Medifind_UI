import { useState } from "react";
import { Container, Row, Col} from "react-bootstrap";
import { CardComponent } from "../components/customComponents/CardComponent";
import { AddBtn } from "../components/customComponents/Addbtn";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../customHooks/useFetch";
import { useDecoded } from "../customHooks/useDecode";


export const CardPage = () => {
  const navigate = useNavigate();
  const goToRequestMedicine = () => navigate("/RequestMedicine");
  const decodedToken = useDecoded();
  // Move the fetch hook before any conditional returns
  const { data, isLoading, serverError } = useFetch(
    decodedToken ? `http://localhost:7777/request/${decodedToken.id}` : null
  );
  console.log(data)
  const handleIncrease = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const handleDecrease = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
      <>
      <Row>
        {data ? data.map((item) => (
          <Col key={item.id} xs={12} md={6} lg={5} className="mb-3">
            <CardComponent
              image={item.medicine.image_path}
              name={item.medicine.name}
              quantity={item.medicine.concentration}
              /* onIncrease={() => handleIncrease(item.id)}
              onDecrease={() => handleDecrease(item.id)}
              onRemove= {() => handleRemove(item.id)} */
            />
          </Col>
        )) : null 
      }
      </Row>
      <div className="text-center mt-3 ">
        
        <AddBtn onClick={goToRequestMedicine} className="ms-auto d-block" style={{ backgroundColor: "#109d89", border: "none", fontSize: "18px",width:"200px" ,marginRight:"150px"}}>Check out</AddBtn>     
      </div>
    </>
  );
};

