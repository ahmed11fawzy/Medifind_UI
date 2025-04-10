import styles from "./Post.module.css";

import { useFetch } from "../../../customHooks/useFetch";
import { SlideDown } from "../SlideDown/SlideDown";
export function Post({page,getTotalPage}) {
    const { data,totalPage ,isLoading, serverError } = useFetch(`http://192.168.1.10:7777/acceptedMedicine?page=${page}&limit=4`);
    console.log(data);
    getTotalPage(totalPage)
    return (
        <div className="row  gy-5">
            {data ? (
                data.map((Medicine) => (
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