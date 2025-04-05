import styles from "./Post.module.css";

import { useFetch } from "../../../customHooks/useFetch";
import { SlideDown } from "../SlideDown/SlideDown";
export function Post() {
    const { data, isLoading, serverError } = useFetch('https://medifind-production.up.railway.app/medicine');
    console.log(data);
    const acceptedMedicine = data?.filter((medicine) => medicine.status === true)
    console.log(acceptedMedicine)
    return (
        <div className="row  gy-5 ">
            {acceptedMedicine ? (
                acceptedMedicine.map((Medicine) => (
                    <div className="col-12 col-md-4" key={Medicine.id}>
                        <div className={styles.post}>
                        <SlideDown key={Medicine.id} Medicine={Medicine} />
                        </div>
                    </div>
                ))
            ) : null}
        </div>
    );


}