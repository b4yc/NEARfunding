import React, { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import "./card.css";
import DonateForm from "./DonateForm";

export default function Fundraiser({ title, description, id, amount }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <Card className="card">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Amount raised: {amount}Ⓝ </Card.Text>
        <Button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Donate
        </Button>
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <DonateForm id={id} />
        </Modal>
      </Card.Body>
    </Card>
  );
}
