import { useState } from "react";
import { Form } from "react-bootstrap";
import img1 from "../assets/prescription.png"
import { AddBtn } from "../components/customComponents/Addbtn";
export const RequestsReview = () => {


    return (
        <>

        <div className="row mb-5 mt-3">
            <div className="col-5">
                <img src={img1}
                style={{ width: "100%", height: "100%" }}
                alt="prescription" />
                </div>

            <div className="col-6 mt-5  ms-2 ">
           <div> 
                   <div className="mb-0 mt-5">
                      <h4>Reason</h4> 
                      <div style={{ 'backgroundColor':"#E6E6E6",'width':"100%",height:"100%",'padding':'10px','borderRadius':'5px'}} rows={8} >Lorem ipsum dolor 
                        sit amet consectetur 
                        adipisicing elit. Quaerat, quae dignissimos. Quas tempore, accusamus aperiam sapiente repudiandae,
                         ratione voluptates 
                        ea officia earum quam fugit vero illo necessitatibus sint, fugiat reprehenderit?</div>
                   
                   <AddBtn style={{'width':"30%",marginTop:"10px"}}>Accept</AddBtn>
                   <AddBtn style={{backgroundColor:"#C7282A",marginLeft:"10px",'width':"30%",marginTop:"10px"}}>Reject</AddBtn>
             </div>


                   </div>

            </div>
            <hr className="mt-5" />

        </div>
        </>
  );
};
