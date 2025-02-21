import React from 'react'
import { Loader } from '../../components/customComponents/Loader/Loader'
import { useLocation } from 'react-router-dom'

export default function UpdateMedicine() {
  const { state } = useLocation();
  const { id: _id, medicineName: name, image_path: image, quantity, exp_date: date, concentration: conc } = state || {};
  return (
    <>
      {isUploading && <Loader />}
      <Container style={{ marginTop: "50px" }}>
        <Card className="p-4 shadow-sm">
          <h3 className="text-center mb-4">Add Medicine</h3>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Medicine Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setMedicineName(e.target.value)}
                    isInvalid={!!errors.medicineName}
                  />
                  <Form.Control.Feedback type="invalid">{errors.medicineName}</Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="col-12 col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Number of Pieces:</Form.Label>
                  <Form.Control
                    type="text"
                    value={quantity}
                    onChange={(e) => setNumPieces(e.target.value)}
                    isInvalid={!!errors.numPieces}
                  />
                  <Form.Control.Feedback type="invalid">{errors.numPieces}</Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="col-12 col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Expire Date:</Form.Label>
                  <Form.Control
                    type="date"
                    value={exp_date}
                    onChange={(e) => setExpireDate(e.target.value)}
                    isInvalid={!!errors.expireDate}
                  />
                  <Form.Control.Feedback type="invalid">{errors.expireDate}</Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="col-12 col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Concentration:</Form.Label>
                  <Form.Control
                    type="text"
                    value={conc}
                    onChange={(e) => setConcentration(e.target.value)}
                    isInvalid={!!errors.concentration}
                  />
                  <Form.Control.Feedback type="invalid">{errors.concentration}</Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="col-12">
                <Form.Group className="mb-3">
                  <Form.Label>Add Image:</Form.Label>
                  <Form.Control
                    id="imageInput"
                    type="file"
                    value={image}
                    accept="image/png, image/jpeg"
                    onChange={handleUpload}
                    isInvalid={!!errors.image}
                  />
                  <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>

            <div className="text-center d-flex justify-content-end w-25 ms-auto">
              <AddBtn type="submit" >Update</AddBtn>
            </div>
          </Form>
        </Card>
      </Container>
    </>
  )
}
