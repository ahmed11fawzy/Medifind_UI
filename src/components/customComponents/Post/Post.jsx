import styles from "./Post.module.css";

import { useFetch } from "../../../customHooks/useFetch";
import { SlideDown } from "../SlideDown/SlideDown";
export function Post(){
    const { data, isLoading, serverError } = useFetch('http://localhost:7777/medicine');  
    console.log(data);
    const acceptedMedicine=data?.filter((medicine)=>medicine.status===true)
    console.log(acceptedMedicine)
    return (
        <div className="row gap-4 gx-5 gy-md-5 ">
            {acceptedMedicine ? (
                acceptedMedicine.map((Medicine) => (
                    <div className="col-12 col-md-4" key={Medicine.id}>
                        <SlideDown key={Medicine.id} Medicine={Medicine} />
                    </div>
                ))
            ) : null}
        </div>
    );
        
    
}