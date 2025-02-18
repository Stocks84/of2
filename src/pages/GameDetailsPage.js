import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Spinner, Alert } from "react-bootstrap";
import gameService from "../services/gameService"; // Import gameService

const GameDetailsPage = () => {
  const { gameId } = useParams(); // Get game ID from URL
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameData = await gameService.getGameById(gameId);
        setGame(gameData);
      } catch (err) {
        setError("Failed to load game details.");
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  if (loading) return <Spinner animation="border" className="mt-4" />;
  if (error) return <Alert variant="danger" className="mt-4">{error}</Alert>;

  return (
    <div className="container mt-4">
      <Button variant="secondary" onClick={() => navigate("/")}>
        ← Back
      </Button>

      <Card className="mt-3">
        <Card.Body>
          <Card.Title>{game?.title}</Card.Title>
          <Card.Text>{game?.description}</Card.Text>
          <p><strong>Created by:</strong> {game?.creator}</p>
          {/* Placeholder for Likes & Comments Section */}
          <hr />
          <p>Likes and comments section coming soon!</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default GameDetailsPage;
