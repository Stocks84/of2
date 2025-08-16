import React, { useState, useEffect } from "react";
import gameService from "../services/gameService";
import { isAuthenticated } from "../services/authService";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import Notification from "../components/Notification";

const GamesPage = () => {
  const userLoggedIn = isAuthenticated();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newGame, setNewGame] = useState({ title: "", description: "", rules: "" });
  const [notification, setNotification] = useState({ message: "", variant: "" });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (userLoggedIn) {
      fetchUserGames();
    }
  }, [userLoggedIn]);

  const fetchUserGames = async () => {
    try {
      setLoading(true);
      const userGames = await gameService.getUserGames();
      if (!Array.isArray(userGames)) {
        setNotification({ message: "Invalid API response format.", variant: "danger" });
        return;
      }
      setGames(userGames);
      const userProfile = await gameService.getUserProfile();
      setUserId(userProfile.id);
    } catch (error) {
      setNotification({ message: "Failed to load games.", variant: "danger" });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGame = async (e) => {
    e.preventDefault();
    try {
      const createdGame = await gameService.createGame(newGame);
      setGames([...games, createdGame]);
      setNewGame({ title: "", description: "", rules: "" });
      setNotification({ message: "Game created successfully.", variant: "success" });
    } catch (error) {
      setNotification({ message: "Failed to create game.", variant: "danger" });
    }
  };

  const handleDeleteGame = async (gameId) => {
    if (!window.confirm("Delete this game?")) return;
    try {
      await gameService.deleteGame(gameId);
      setGames(games.filter((game) => game.id !== gameId));
      setNotification({ message: "Game deleted.", variant: "success" });
    } catch (error) {
      setNotification({ message: "Failed to delete game.", variant: "danger" });
    }
  };

  return (
    <Container>
      <h2 className="mt-4">My Games</h2>

      <Notification
        message={notification.message}
        variant={notification.variant}
        onClose={() => setNotification({ message: "", variant: "" })}
      />

      {userLoggedIn && (
        <Form onSubmit={handleCreateGame} className="mb-4">
          <Form.Group controlId="gameTitle" className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={newGame.title}
              onChange={(e) => setNewGame({ ...newGame, title: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="gameDescription" className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={newGame.description}
              onChange={(e) => setNewGame({ ...newGame, description: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="gameRules" className="mb-2">
            <Form.Label>Rules</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={newGame.rules}
              onChange={(e) => setNewGame({ ...newGame, rules: e.target.value })}
              required
            />
          </Form.Group>

          <Button type="submit" className="mt-2">Add Game</Button>
        </Form>
      )}

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
                  {userLoggedIn && game.creator === userId && (
                    <Button variant="danger" onClick={() => handleDeleteGame(game.id)}>
                      Delete
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default GamesPage;
