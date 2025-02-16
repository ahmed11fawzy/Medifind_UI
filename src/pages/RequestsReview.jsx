import { useState,useEffect } from "react";
import { Form } from "react-bootstrap";
import img1 from "../assets/prescription.png"
import { AddBtn } from "../components/customComponents/Addbtn";
export const RequestsReview = () => {
 
    const [requests, setRequests] = useState([]);    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:7777/request");
            console.log(response);
            if (!response.ok) {
              throw new Error(`Server error: ${response.status} - ${response.statusText}`);
            }
          
            const result = await response.json();
            const data = result.data;
            setRequests(data); 
            console.log("Fetched Medicines:", data);
          } catch (error) {
            console.error("Fetch error:", error);
          }
        };
      
        fetchData();
      }, []);

    return (
        <>

       {requests.map((request,index) =>
         <div className="row mb-5 mt-3" key={index}> 
            <div className="col-5">
                <img src={img1}
                style={{ width: "100%", height: "100%" }}
                alt="prescription" />
                </div>

            <div className="col-6 mt-5  ms-2 ">
           <div> 
                   <div className="mb-0 mt-5">
                      <h4>Reason</h4> 
                        <span><b>medicine name:</b></span> <span>{request.req_name}</span>
                      <div style={{ 'backgroundColor':"#E6E6E6",'width':"100%",height:"100%",'padding':'10px','borderRadius':'5px','marginTop':'10px'}} rows={8} >
                      {request.req_description}</div>
                   
                   <AddBtn style={{'width':"30%",marginTop:"10px"}}>Accept</AddBtn>
                   <AddBtn style={{backgroundColor:"#C7282A",marginLeft:"10px",'width':"30%",marginTop:"10px"}}>Reject</AddBtn>
             </div>


                   </div>

            </div>
            <hr className="mt-5" />

        </div>
             )}
        </>
  );
};
