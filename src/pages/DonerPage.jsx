import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CardDonation } from "../components/customComponents/CardDonation.jsx";
import { AddBtn } from "../components/customComponents/Addbtn";
import { useNavigate } from "react-router-dom";
import { useDecoded } from "../customHooks/useDecode";
import { useGet } from "../customHooks/useGet.js";
import { useDelete } from "../customHooks/useDelete";

export const DonorPage = () => {
  const navigate = useNavigate();
  const goToDonateMedicine = () => navigate("/AddMedicine");
  const goToUpdateMedicine = (_id) => navigate(`/UpdateMedicine/${_id}`);
  const decodedToken = useDecoded();
  const baseUrl = `http://localhost:7777/medicine`;
  const { data, isLoading, serverError, getRequest } = useGet(
    decodedToken ? `${baseUrl}/${decodedToken.id}` : null
  );

  useEffect(() => {
    if (decodedToken) {
      getRequest();

    }
  }, [decodedToken]);
  console.log(data);

  // IMP Request refer to request to Add medicine          

  const { isLoading: deleteLoading, serverError: deleteError, deleteRequest } =
    useDelete(decodedToken ? `${baseUrl}/${decodedToken.id}` : null);

  const handleRemove = async (donation_id) => {
    try {
      await deleteRequest(donation_id);
      await getRequest();
      console.log("medicine deleted successfully");
    } catch (error) {
      console.error("Failed to delete medicine:", error);
    }
  };


  return (
    <>
      {<Row>
        {data && data.length > 0 ? (
          data.map((item) => (
            <Col key={item._id} xs={12} md={6} lg={5} className="mb-3">
              <CardDonation
                image={item.image_path}
                name={item.name}
                quantity={item.concentration}
                pcs={item.quantity}
                expDate={item.exp_date}
                OnUpdate={() => goToUpdateMedicine(item._id)}
                onRemove={() => handleRemove(item._id)}
              >

              </CardDonation>
            </Col>
          ))
        ) : (
          <div className="text-center"> nothing to show</div>
        )}
      </Row>}


    </>
  );
};
