import React from "react";
import { Card, Button } from "react-bootstrap";
import placeholderImage from "../assets/Placeholder.png"; // Placeholder image

const GameCard = ({ title, description, rules }) => {
  return (
    <Card className="mb-3">
      <Card.Img variant="top" src={placeholderImage} alt="Game" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary">View Details</Button>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
