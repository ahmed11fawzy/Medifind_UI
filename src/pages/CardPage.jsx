import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDecoded } from "../customHooks/useDecode";
import { useDelete } from "../customHooks/useDelete";
import { CardNeeds } from "../components/customComponents/CardNeeds";

export const CardPage = () => {
  const [requests, setRequests] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const decodedToken = useDecoded();
  const req_Url = "https://medifind-production.up.railway.app/request";
  const order_Url = "https://medifind-production.up.railway.app/orders"; // if needed

  // Initialize delete hooks for each endpoint at the top level.
  const requestDelete = useDelete(req_Url);
  const orderDelete = useDelete(order_Url);
  

  // Helper function to fetch requests (or orders) 
  const fetchRequests = async (url, setFunction) => {
    try {
      const response = await fetch(`${url}/${decodedToken.id}`);
      console.log(response);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} - ${response.statusText}`);
      }
      const result = await response.json();
      const data = result.data;
      setFunction(data);
      console.log("Fetched data:", data);
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (decodedToken) {
      fetchRequests(req_Url, setRequests);
      fetchRequests(order_Url, setOrders);
    }
  }, [decodedToken]);

  // Delete handler for both requests and orders.
  const handleRemove = async (url, del_id, setFunction) => {
    try {
      if (url === req_Url) {
        await requestDelete.deleteRequest(del_id);
      } else if (url === order_Url) {
        await orderDelete.deleteRequest(del_id);
      }
      await fetchRequests(url, setFunction);
      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  // Navigation function that passes required state
  const goToRequestMedicine = (name, medicine_id, request_id) => {
    navigate("/RequestMedicine", {
      state: { medicineName: name, medicine_id, request_id, requested: true },
    });
  };
  const goToUpdateRequest = ( request_id,url) => {
    navigate(`/UpdateRequest/${request_id}`, {
      state: { request_id, requested: true , url},
    });
  };

  return (
    <>
      <Row>
        {requests.map((item) => (
          <Col key={item._id} xs={12} md={6} lg={5} className="mb-3">
            <CardNeeds
              requested={item.requested}
              medicine_id={item.medicine?._id}
              examined={item.examined}
              status={item.status}
              request_id={item._id}
              prescription_img={item.prescription_img || ""}
              image={item.medicine?.image_path || ""}
              name={item.req_name ||  item.medicine?.name ||"No name"}
              quantity={item.medicine?.concentration || ""}
              onRemove={() => handleRemove(req_Url, item._id, setRequests)}
              goToRequestMedicine={() =>
                goToRequestMedicine(item.medicine.name, item.medicine._id, item._id)
              }
              goToUpdateRequest={()=>
                goToUpdateRequest(item._id,req_Url)  
              }
            />
          </Col>
        ))}
      </Row>

      <Row>
        {orders.map((item) => (
          <Col key={item._id} xs={12} md={6} lg={5} className="mb-3">
            <CardNeeds
              examined={item.examined}
              status={item.status}
              request_id={item._id}
              image={item.prescription_img || ""}
              name={item.req_name || "No name"}
              onRemove={() => handleRemove(order_Url, item._id, setOrders)}
              requested={item.requested}
              goToUpdateRequest={()=>
                goToUpdateRequest(item._id,order_Url)  
              }

            />
          </Col>
        ))}
      </Row>
    </>
  );
};
