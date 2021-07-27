import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";

export default function FundraiserForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    window.contract.createFundraiser({ title, description }).then(() => {
      location.reload();
    });
  }

  return (
    <div>
      <Form onSubmit={onSubmit} style={{ padding: "20px" }}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            maxLength="50"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="description"
            placeholder="Enter description"
            value={description}
            maxLength="100"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {!loading ? (
            "Create"
          ) : (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          <span className="visually-hidden">Loading...</span>
        </Button>
      </Form>
    </div>
  );
}
