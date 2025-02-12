import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Spinner } from "react-bootstrap";
import api from "../services/api"; // Placeholder for gameService

const GameDetails = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await api.get(`/games/${gameId}/`);
        setGame(response.data);
      } catch (err) {
        setError("Failed to load game details.");
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <Button variant="secondary" onClick={() => navigate("/")}>Back</Button>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>{game?.title}</Card.Title>
          <Card.Text>{game?.description}</Card.Text>
          <p><strong>Created by:</strong> {game?.creator}</p>
          {/* Placeholder for likes and comments section */}
        </Card.Body>
      </Card>
    </div>
  );
};

export default GameDetails;
