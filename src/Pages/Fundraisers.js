import React, { useState, useEffect } from "react";
import FundraiserCard from "../Components/FundraiserCard";
import { Card, Modal, Spinner, Container, Row, Col } from "react-bootstrap";
import FundraiserForm from "../Components/FundraiserForm";
import "../Components/card.css";

export default function Fundraisers() {
  const [showModal, setShowModal] = useState(false);
  const [fundraisers, setFundraisers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.contract
      .getAllMyFundraisers()
      .then((res) => {
        setFundraisers(res);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  return (
    <div>
      {loading ? (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      ) : (
        <Container fluid={true}>
          {fundraisers.length === 0 && (
            <Row>
              <p style={{ textAlign: "center", marginTop: "50px" }}>
                You have no fundraisers, create one by clicking the card below.
              </p>
            </Row>
          )}
          <Row xs={1} sm={2} md={3}>
            {fundraisers.map((fundraiser, index) => (
              <Col key={index}>
                <FundraiserCard
                  title={fundraiser.title}
                  description={fundraiser.description}
                  amount={fundraiser.amountRaised}
                  key={index}
                ></FundraiserCard>
              </Col>
            ))}
            <Col>
              <Card
                className="add-card"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                + Add
              </Card>
            </Col>
            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              dialogClassName="modal-90w"
              aria-labelledby="example-custom-modal-styling-title"
            >
              <FundraiserForm />
            </Modal>
          </Row>
        </Container>
      )}
    </div>
  );
}
