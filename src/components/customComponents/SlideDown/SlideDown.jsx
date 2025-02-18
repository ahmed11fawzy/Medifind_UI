import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import styles  from "../Post/Post.module.css"
import loge from "../../../assets/loge.jpeg";
import { AddBtn } from "../Addbtn";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function SlideDown({Medicine}) {
  const navigate = useNavigate();
  const goRequestMedicine = () => {
    navigate("/RequestMedicine");
  }
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
        <main className={`${styles.post} position-relative px-4 py-3 `}>


          <header className="position-absolute top-0 start-50  translate-middle  ">
            <img src={loge} width={"50px"} height={"50px"} className=" rounded rounded-circle" alt="" />
          </header>
          <h4 className="mt-3 mb-4 text-center">{Medicine.user_id.name}</h4>
          <h5>Name :<span className=" fw-midium fs-5 ">{Medicine.name.toUpperCase()}</span> <span className="fw-light fs-6">{Medicine.concentration}</span></h5>
          <p ><span className="fw-bold" >Expire date :</span> {Medicine.expire_date.split("-").slice(0,2).join("-") } </p>
            
            <AddBtn style={{ width: "100px" }} onClick={goRequestMedicine} className=" mt-2 d-block  ms-auto" >Pick</AddBtn>
        </main>
            
        
        </>
        
      }
    </motion.div>
  );
}