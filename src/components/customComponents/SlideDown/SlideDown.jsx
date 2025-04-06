import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import styles  from "../Post/Post.module.css"
import loge from "../../../assets/loge.jpeg";
import { AddBtn } from "../Addbtn";
import { useNavigate } from "react-router-dom";
import { usePost } from "../../../customHooks/usePost";
import { useDecoded } from "../../../customHooks/useDecode";
import { FaUser,  FaUserTie } from 'react-icons/fa';

export function SlideDown({Medicine}) {
  const IconComponent =  FaUser;
  const decodedToken = useDecoded();
  const navigate = useNavigate();
  const { sendRequest, isLoading } = usePost('https://medifind-production.up.railway.app/request');
  const handleRequest = async () => {
    if (!decodedToken) return;
    
    try {
      const requestData = {
        user_id: decodedToken.id,
        medicine: Medicine._id,
      };
      
      await sendRequest(requestData);
      navigate("/need");
    } catch (error) {
      console.error("Failed to send request:", error);
    }
  };
  const { scrollYProgress } = useScroll();
  // eslint-disable-next-line no-unused-vars
  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  
  return (
    <motion.div
    initial={{
        opacity: 0, y: -50 
      }}
      whileInView={{
        opacity: 1,
        y: 0, // Slide in to its original position
        transition: {
          duration: 1 // Animation duration
        }
      }}
      viewport={{ once: true }}
    >
      {
        
        <>
        <main className={`${styles.post} position-relative px-4 py-4 `}>
          <header className="position-absolute top-0 start-50  translate-middle  ">
             {Medicine.user_id.profileImage ? (
              <img src={Medicine.user_id.profileImage} width={"50px"} height={"50px"} className=" rounded rounded-circle" alt="" />
            ) : (
              <div className=" rounded rounded-circle shadow-lg bg-white d-flex align-items-center justify-content-center  " style={{ width: "50px", height: "50px" }}>
                <IconComponent color="#9c9f9f" size={30} />
              </div>
            )}
          </header>
          <h4 className="mt-3 mb-4 text-center">{Medicine.user_id.name}</h4>
          <p className="fw-bold" >Name: <span className=" fw-normal fs-6 ">{Medicine.name.toUpperCase()}</span> <span className="fw-light fs-6">{Medicine.concentration}</span></p>
          <p ><span className="fw-bold" >Expire date :</span> {Medicine.expire_date.split("-").slice(0,2).join("-") } </p>
            
            <AddBtn 
              style={{ width: "100px" }} 
              onClick={handleRequest} 
              className=" mt-2 d-block  ms-auto"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Pick'}
            </AddBtn>
          </main>
        </>
        
      }
    </motion.div>
  );
}