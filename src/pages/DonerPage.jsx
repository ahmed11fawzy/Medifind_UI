import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CardComponent } from "../components/customComponents/CardComponent";
import { AddBtn } from "../components/customComponents/Addbtn";
import { useNavigate } from "react-router-dom";
import { useDecoded } from "../customHooks/useDecode";
import { useGet } from "../customHooks/useGet.js";
import { useDelete } from "../customHooks/useDelete";

export const DonorPage = () => {
  const navigate = useNavigate();
  const goToDonateMedicine = () => navigate("/AddMedicine"); 

  const decodedToken = useDecoded();
  const baseUrl = `http://localhost:7777/medicine`; // تعديل الرابط ليعكس بيانات التبرع

  // جلب بيانات التبرعات الخاصة بالمتبرع
  const { data, isLoading, serverError, getRequest } = useGet(
    decodedToken ? `${baseUrl}/${decodedToken.id}` : null
  );

  useEffect(() => {
    if (decodedToken) {
      getRequest();
    }
  }, [decodedToken]);

  const { isLoading: deleteLoading, serverError: deleteError, deleteRequest } =
    useDelete("http://localhost:7777/medicine/"); 

  // دالة لإلغاء التبرع
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
      <Row>
        {data && data.length > 0 ? (
          data.map((item) => (
            <Col key={item._id} xs={12} md={6} lg={5} className="mb-3">
              <CardComponent
                image={item.medicine.image_path}
                name={item.medicine.name}
                quantity={item.medicine.concentration}
                pcs={item.medicine.pcs} 
                expDate={item.medicine.exp_date} 
                onRemove={() => handleRemove(item._id)} 
              />
            </Col>
          ))
        ) : (
          <div className="text-center"> nothing to show</div>
        )}
      </Row>

     
    </>
  );
};
