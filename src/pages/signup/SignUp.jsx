/* eslint-disable no-unused-vars */
import {card} from "./signup.module.css"
import styles from "./signup.module.css"
import { Registration } from "../../components/registration/registeration";
import {Card} from "../../components/customComponents/Card";
import donation from "../../assets/donation.jpg"
import humanty from "../../assets/humanty.jpg"
import ilustration from "../../assets/illustration-working.svg"
import loge from "../../assets/loge.jpeg"

export  function SignUp() {
  const items = [<Registration key={0} />, <div key={1} > <img className="img-fluid w-100 " src={humanty} />  </div>];
  return (
    <div className={` container mx-auto  row align-items-center vh-100 `}>
        <header className="">
          <h1 className={ ` ${styles.title}  text-center`}  >Medi 
            <span><img src={loge} alt="" style={{width:"50px" , height:"50px"}} className="img-fluid  rounded rounded-circle "/></span>
             find</h1>
          <h5 className={` ${styles.slogan} mx-auto w-50 text-center `} >Join the Fight: </h5> 
        </header>
      {items.map((item, i) => (
        // eslint-disable-next-line react/jsx-key
        <div className=" col-12 col-md-6 ">
          <Card className={card} key={i} component={item} index={i} />
        </div>
      ))}
    </div>
  );
}

