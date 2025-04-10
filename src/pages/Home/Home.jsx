import { useNavigate } from "react-router-dom";
import styles from "./home.module.css"
import {AddBtn} from "../../components/customComponents/Addbtn"

import { Post } from "../../components/customComponents/Post/Post";
import { Loader } from "../../components/customComponents/Loader/Loader";
import { useEffect, useState } from "react";
export  function Home() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const goToAddMedicine = () => {
    navigate("/AddMedicine"); // Navigates to the About page
  }; 
  const [totalPage, setTotalPage] = useState(null);

  const getTotalPage=(totalPage)=>{
    setTotalPage(totalPage)
  }



  useEffect(() => {
    
  }, [page])
  
  const nextPage=()=>{
    setPage(page + 1)
  }
  const prevPage=()=>{
    setPage(page > 1 ? page - 1 : 1)
  }
  return (
    <> 
      <main className={`${styles.heroSection}   mb-1 `}>
        <h1 className={`${styles.title}`}> <span style={{ color: "var(--main-color)" }} >Give</span> the Gift of Health: Donate <span style={{ color: "var(--main-color)" }} >Medicine</span> Today !</h1>
        <p className="w-50" style={{ color: "var(--secondary-color)" , fontFamily: "Inter, serif"}} >
        Every donated pill is a beacon of hope for someone in need. Join us in our mission to provide essential medicines to underserved 
        communities. By giving the gift of health, you're offering more than just medicine - you're offering a chance at a healthier, 
        brighter future. Donate today and become a vital part of our healing mission.
        </p>
        <AddBtn className=" mt-4" onClick={goToAddMedicine} >Donate</AddBtn>
        
      </main>
      <section className="container mb-5">
        <h2 className="my-5">Latest Donations <span style={{ color: "var(--main-color)" }} ><i className="fa-solid fa-handshake-angle"></i></span> </h2>
        
      <Post page={page} getTotalPage={getTotalPage} style={{ marginTop: "50px !important" }}/>
        
      </section>
      <section className="mt-5 mb-5 d-flex justify-content-center align-items-center">
        <div className={styles.paginationContainer}>
          <button 
            className={`${styles.paginationBtn} ${styles.prevBtn}`} 
            onClick={prevPage}
            disabled={page <= 1}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <div className={styles.pageIndicator}>
            <span>{page}</span>
          </div>
          
          <button 
            className={`${styles.paginationBtn} ${styles.nextBtn}`} 
            onClick={nextPage}
            disabled={page >= totalPage}

          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </section>
      
    </>
  )
}
   