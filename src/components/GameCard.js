import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate  } from "react-router-dom";
import placeholderImage from "../assets/Placeholder.png"; // Placeholder image

const GameCard = ({ id, title, description, rules }) => {
  const navigate = useNavigate();

  return (
    <Card className="mb-3">
      <Card.Img variant="top" src={placeholderImage} alt="Game" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary" onClick={() => navigate(`/games/${id}`)}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
