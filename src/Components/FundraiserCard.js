import React from "react";
import { Card } from "react-bootstrap";
import "./card.css";

export default function FundraiserCard({ title, amount, description }) {
  return (
    <Card className="card">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Subtitle>Amount raised: {amount} Ⓝ</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}
