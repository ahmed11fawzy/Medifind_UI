import styles from "./Post.module.css";

import { useFetch } from "../../../customHooks/useFetch";
import { SlideDown } from "../SlideDown/SlideDown";
export function Post(){
    const { data, isLoading, serverError } = useFetch('http://localhost:7777/medicine');  
    console.log(data);
    return (
        <div className="row gy-md-5 ">
            {data ? (
                data.map((Medicine) => (
                    <div className="col-12 col-md-4" key={Medicine.id}>
                        <SlideDown key={Medicine.id} Medicine={Medicine} />
                    </div>
                ))
            ) : null}
        </div>
    );
        
    
}