import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import Big from "big.js";

const BOATLOAD_OF_GAS = Big(3)
  .times(10 ** 13)
  .toFixed();

export default function DonateForm({ id }) {
  const [donation, setDonation] = useState("");
  const [loading, setLoading] = useState(false);
  function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    window.contract
      .transferNearTokens(
        {
          fundraiserId: id,
          parsedAmount: window.utils.format.parseNearAmount(donation),
          nearAmount: parseInt(donation),
        },
        BOATLOAD_OF_GAS,
        Big(donation || "0")
          .times(10 ** 24)
          .toFixed()
      )
      .then(() => {
        console.log("transferred " + donation + " tokens to " + id);
      });
  }

  return (
    <div>
      <Form onSubmit={onSubmit} style={{ padding: "20px" }}>
        <Form.Group className="mb-3">
          <Form.Label>Donation Amount:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            value={donation}
            min="0"
            step="1"
            onChange={(e) => {
              setDonation(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {!loading ? (
            "Donate"
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
