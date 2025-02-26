// import styles from "./Post.module.css";

// import { useFetch } from "../../../customHooks/useFetch";
// import { SlideDown } from "../SlideDown/SlideDown";
// export function Post() {
//     const { data, isLoading, serverError } = useFetch('http://localhost:7777/medicine');
//     console.log(data);
//     const acceptedMedicine = data?.filter((medicine) => medicine.status === true)
//     console.log(acceptedMedicine)
//     return (
//         <div className="row  gy-5 ">
//             {acceptedMedicine ? (
//                 acceptedMedicine.map((Medicine) => (
//                     <div className="col-12 col-md-4" key={Medicine.id}>
//                         <SlideDown key={Medicine.id} Medicine={Medicine} />
//                     </div>
//                 ))
//             ) : null}
//         </div>
//     );


// }

import styles from "./Post.module.css";
import { useFetch } from "../../../customHooks/useFetch";
import { SlideDown } from "../SlideDown/SlideDown";

export function Post() {
  const { data, isLoading, serverError } = useFetch('http://localhost:7777/medicine');

  // Filter medicines that are accepted (status: true) and have a quantity greater than 0
  const acceptedMedicine = data?.filter(
    (medicine) => medicine.status === true && medicine.quantity > 0
  );

  return (
    <div className="row gy-5">
      {isLoading ? (
        <p>Loading...</p>
      ) : serverError ? (
        <p>Error: {serverError.message}</p>
      ) : acceptedMedicine && acceptedMedicine.length > 0 ? (
        acceptedMedicine.map((medicine) => (
          <div className="col-12 col-md-4" key={medicine._id}>
            <SlideDown key={medicine._id} Medicine={medicine} />
          </div>
        ))
      ) : (
        <p>No medicines available.</p>
      )}
    </div>
  );
}