import React, { useState } from "react";
import { Container, Row, Col} from "react-bootstrap";
import { CardComponent } from "../components/customComponents/CardComponent";
import { AddBtn } from "../components/customComponents/Addbtn";
// import { MyNavbar } from "../components/sharedComponents/MyNavbar";
// import { MyFooter } from "../components/sharedComponents/MyFooter";

import image1 from "../assets/img1.jpg";
import image2 from "../assets/img2.jpg";
import image3 from "../assets/img3.jpg";
import image4 from "../assets/img4.jpg";

const initialItems = [
  { id: 1, name: "Alphintern", image: image1, quantity: 1 },
  { id: 2, name: "Mebo", image: image2, quantity: 1 },
  { id: 3, name: "Moov", image: image3, quantity: 1 },
  { id: 4, name: "Panadol", image: image4, quantity: 1 },
];

export const CardPage = () => {
  const [items, setItems] = useState(initialItems);

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
      <Container style={{ maxWidth: "900px", paddingTop: "20px" }}>
      <Row>
        {items.map((item) => (
          <Col key={item.id} xs={12} md={6} lg={5} className="mb-3">
            <CardComponent
              image={item.image}
              name={item.name}
              quantity={item.quantity}
              onIncrease={() => handleIncrease(item.id)}
              onDecrease={() => handleDecrease(item.id)}
              onRemove={() => handleRemove(item.id)}
            />
          </Col>
        ))}
      </Row>
      <div className="text-center mt-3 ">
        {/* <Button
          style={{
            backgroundColor: "#109d89",
            border: "none",
            fontSize: "18px",
            padding: "10px 20px",
          }}
        >
          Check out
        </Button> */}
        <AddBtn className="ms-auto d-block" style={{ backgroundColor: "#109d89", border: "none", fontSize: "18px",width:"200px" ,marginRight:"150px"}}>Check out</AddBtn>     
      </div>
    </Container>
  );
};

