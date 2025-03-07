import React, { useState, useEffect } from "react";
import gameService from "../services/gameService";
import { useAuth } from "../services/authService";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";

const GamesPage = () => {
  const { user } = useAuth();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newGame, setNewGame] = useState({ title: "", description: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchGames();
    }
  }, [user]);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const allGames = await gameService.getGames();
      // Filter games to show only the logged-in user's games
      const userGames = allGames.results.filter(game => game.owner === user.id);
      setGames(userGames);
    } catch (error) {
      setError("Failed to load games.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGame = async (e) => {
    e.preventDefault();
    try {
      const createdGame = await gameService.createGame({
        ...newGame,
        owner: user.id, // Ensure the user ID is set when creating a game
      });
      setGames([...games, createdGame]);
      setNewGame({ title: "", description: "" });
    } catch (error) {
      setError("Failed to create game.");
    }
  };

  const handleDeleteGame = async (gameId) => {
    try {
      await gameService.deleteGame(gameId);
      setGames(games.filter(game => game.id !== gameId));
    } catch (error) {
      setError("Failed to delete game.");
    }
  };

  return (
    <Container>
      <h2 className="mt-4">My Games</h2>

      {/* Create Game Form */}
      <Form onSubmit={handleCreateGame} className="mb-4">
        <Form.Group controlId="gameTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={newGame.title}
            onChange={(e) => setNewGame({ ...newGame, title: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="gameDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={newGame.description}
            onChange={(e) => setNewGame({ ...newGame, description: e.target.value })}
            required
          />
        </Form.Group>
        <Button type="submit" className="mt-2">Add Game</Button>
      </Form>

      {/* Display Games */}
      {loading ? (
        <p>Loading games...</p>
      ) : games.length === 0 ? (
        <p>No games found.</p>
      ) : (
        <Row>
          {games.map((game) => (
            <Col md={4} key={game.id}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{game.title}</Card.Title>
                  <Card.Text>{game.description}</Card.Text>
                  <Button variant="danger" onClick={() => handleDeleteGame(game.id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {error && <p className="text-danger">{error}</p>}
    </Container>
  );
};

export default GamesPage;
