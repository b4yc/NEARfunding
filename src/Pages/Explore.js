import React, { useState, useEffect } from "react";
import DonateCard from "../Components/DonateCard";
import { Spinner, Container, Row, Col } from "react-bootstrap";

export default function Explore() {
  const [fundraisers, setFundraisers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.contract
      .getAllOtherFundraisers()
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
          <Row xs={1} sm={2} md={3}>
            {fundraisers.map((fundraiser) => (
              <Col>
                <DonateCard
                  title={fundraiser.title}
                  description={fundraiser.description}
                  amount={fundraiser.amountRaised}
                  key={fundraiser.id}
                  id={fundraiser.id}
                ></DonateCard>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
}
