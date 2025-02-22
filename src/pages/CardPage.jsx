
// import { useState, useEffect } from "react";
// import { Row, Col } from "react-bootstrap";
// import { CardComponent } from "../components/customComponents/CardComponent";
// import { useNavigate } from "react-router-dom";
// import { useDecoded } from "../customHooks/useDecode";
// import { useGet } from "../customHooks/useGet.js";
// import { useDelete } from "../customHooks/useDelete";

// export const CardPage = () => {
//   const [requestedItems, setRequestedItems] = useState([]);
//   const [requestedOrder, setRequestedOrder] = useState([]);
//   const [requests, setRequests] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const navigate = useNavigate();
//   const decodedToken = useDecoded();
//   const req_Url = "http://localhost:7777/request";
//   const order_Url = "http://localhost:7777/orders";

//   const fetchRequests = async (url,setFunction) => {
//     try {
//       const response = await fetch(`${url}/${decodedToken._id}`);
//       console.log(response);
//       if (!response.ok) {
//         throw new Error(`Server error: ${response.status} - ${response.statusText}`);
//       }
    
//       const result = await response.json();
//       const data = result.data;
//       setFunction(data); 
//       console.log("Fetched Medicines:", data);
//       return data;
//     } catch (error) {
//       console.error("Fetch error:", error);
//     }
//   };


//   useEffect(() => {
//     if (decodedToken) {
//       const requestedData = fetchRequests(req_Url,setRequests);
//       const requestedOrders =  fetchRequests(order_Url,setOrders);
//     }
//   }, [decodedToken]);

//   // When data changes, augment each item with a requested flag using localStorage.
//   useEffect(() => {
//     if (requestedData) {
//       const requestedIds = JSON.parse(localStorage.getItem("requestedIds")) || [];
//       const augmentedData = data.map((item) => ({
//         ...item,
//         requested: requestedIds.includes(item._id),
//       }));
//       setRequestedItems(augmentedData);
//     } 
//   }, [requestedData]);

//   const { deleteRequest } = useDelete("http://localhost:7777/request/");

//   const handleRemove = async (req_id) => {
//     try {
//       await deleteRequest(req_id);
//       await fetchRequests(req_Url,setRequests);
//       console.log("Request deleted successfully");
//     } catch (error) {
//       console.error("Failed to delete request:", error);
//     }
//   };

//   // Navigation function that passes required state
//   const goToRequestMedicine = (name, medicine_id, request_id) => {
//     navigate("/RequestMedicine", {
//       state: { medicineName: name, medicine_id, request_id, requested: true },
//     });
//   };

//   return (
//     <>
//       <Row>
//         {requestedItems && requestedItems.length > 0 ? (
//           requestedItems.map((item) =>
//             item.medicine ? (
//               <Col key={item._id} xs={12} md={6} lg={5} className="mb-3">
//                 <CardComponent
//                   medicine_id={item.medicine?._id}
//                   examined={item.examined}
//                   status={item.status}
//                   request_id={item._id}
//                   image={item.medicine?.image_path || ""}
//                   name={item.medicine?.name || "No name"}
//                   quantity={item.medicine?.concentration || ""}
//                   onRemove={() => handleRemove(item._id)}
//                   goToRequestMedicine={() =>
//                     goToRequestMedicine(
//                       item.medicine?.name,
//                       item.medicine?._id,
//                       item._id
//                     )
//                   }
//                   requested={item.requested}
//                   // Update the requested flag for this item and persist it to localStorage
//                   setRequested={(flag) => {
//                     setRequestedItems((prev) =>
//                       prev.map((it) =>
//                         it._id === item._id ? { ...it, requested: flag } : it
//                       )
//                     );
//                     // Update localStorage accordingly
//                     let requestedIds = JSON.parse(localStorage.getItem("requestedIds")) || [];
//                     if (flag && !requestedIds.includes(item._id)) {
//                       requestedIds.push(item._id);
//                     } else if (!flag && requestedIds.includes(item._id)) {
//                       requestedIds = requestedIds.filter((id) => id !== item._id);
//                     }
//                     localStorage.setItem("requestedIds", JSON.stringify(requestedIds));
//                   }}
//                 />
//               </Col>
//             ) : null
//           )
//         ) : (
//           <div>Nothing to display</div>
//         )}
//       </Row>
//     </>
//   );
// };

  

import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { CardComponent } from "../components/customComponents/CardComponent";
import { useNavigate } from "react-router-dom";
import { useDecoded } from "../customHooks/useDecode";
import { useGet } from "../customHooks/useGet.js";
import { useDelete } from "../customHooks/useDelete";

export const CardPage = () => {
  const [requestedItems, setRequestedItems] = useState([]);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const decodedToken = useDecoded();
  const req_Url = "http://localhost:7777/request";
  const order_Url = "http://localhost:7777/orders"; // if needed

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
      // If needed, you can fetch orders similarly:
      // fetchRequests(order_Url, setOrders);
    }
  }, [decodedToken]);

  // When requests change, augment each item with a requested flag from localStorage.
  useEffect(() => {
    if (requests) {
      const requestedIds = JSON.parse(localStorage.getItem("requestedIds")) || [];
      const augmentedData = requests.map((item) => ({
        ...item,
        requested: requestedIds.includes(item._id),
      }));
      setRequestedItems(augmentedData);
    }
  }, [requests]);

  const { deleteRequest } = useDelete("http://localhost:7777/request/");

  const handleRemove = async (req_id) => {
    try {
      await deleteRequest(req_id);
      await fetchRequests(req_Url, setRequests);
      console.log("Request deleted successfully");
    } catch (error) {
      console.error("Failed to delete request:", error);
    }
  };

  // Navigation function that passes required state
  const goToRequestMedicine = (name, medicine_id, request_id) => {
    navigate("/RequestMedicine", {
      state: { medicineName: name, medicine_id, request_id, requested: true },
    });
  };

  return (
    <>
      <Row>
        {requestedItems && requestedItems.length > 0 ? (
          requestedItems.map((item) =>
            item.medicine ? (
              <Col key={item._id} xs={12} md={6} lg={5} className="mb-3">
                <CardComponent
                  medicine_id={item.medicine?._id}
                  examined={item.examined}
                  status={item.status}
                  request_id={item._id}
                  image={item.medicine?.image_path || ""}
                  name={item.medicine?.name || "No name"}
                  quantity={item.medicine?.concentration || ""}
                  onRemove={() => handleRemove(item._id)}
                  goToRequestMedicine={() =>
                    goToRequestMedicine(item.medicine?.name, item.medicine?._id, item._id)
                  }
                  requested={item.requested}
                  // Update the requested flag for this item and persist it to localStorage
                  setRequested={(flag) => {
                    setRequestedItems((prev) =>
                      prev.map((it) =>
                        it._id === item._id ? { ...it, requested: flag } : it
                      )
                    );
                    // Update localStorage accordingly
                    let requestedIds = JSON.parse(localStorage.getItem("requestedIds")) || [];
                    if (flag && !requestedIds.includes(item._id)) {
                      requestedIds.push(item._id);
                    } else if (!flag && requestedIds.includes(item._id)) {
                      requestedIds = requestedIds.filter((id) => id !== item._id);
                    }
                    localStorage.setItem("requestedIds", JSON.stringify(requestedIds));
                  }}
                />
              </Col>
            ) : null
          )
        ) : (
          <div>Nothing to display</div>
        )}
      </Row>
    </>
  );
};




