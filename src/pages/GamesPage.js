import React, { useState, useEffect } from "react";
import gameService from "../services/gameService";
import { isAuthenticated } from "../services/authService";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";

const GamesPage = () => {
  const userLoggedIn = isAuthenticated();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newGame, setNewGame] = useState({ title: "", description: "" });
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null); // Store logged-in user's ID

  useEffect(() => {
    if (userLoggedIn) {
      fetchUserGames();
    }
  }, [userLoggedIn]);

  const fetchUserGames = async () => {
    try {
      setLoading(true);
      console.log("Fetching user games...");

      // Fetch only the user's games directly
      const userGames = await gameService.getUserGames();

      console.log("API Response (user games):", userGames);
      
      if (!Array.isArray(userGames)) {
        console.error("Error: Expected an array, but got:", userGames);
        setError("Invalid API response format.");
        return;
      }

      setGames(userGames);

      // Fetch user profile to get their ID (only once)
      const userProfile = await gameService.getUserProfile();
      setUserId(userProfile.id);

      console.log("User Games Fetched:", userGames);
    } catch (error) {
      console.error("Error fetching user's games:", error);
      setError("Failed to load games.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGame = async (e) => {
    e.preventDefault();

    console.log("Submitting game:", newGame);

    try {
      const createdGame = await gameService.createGame(newGame);
      console.log("Game Created:", createdGame);
      setGames([...games, createdGame]); // Update state with new game
      setNewGame({ title: "", description: "" });
    } catch (error) {
      console.error("Failed to create game:", error);
      setError("Failed to create game.");
    }
  };

  const handleDeleteGame = async (gameId) => {
    try {
      await gameService.deleteGame(gameId);
      setGames(games.filter((game) => game.id !== gameId)); // Remove from state
    } catch (error) {
      console.error("Failed to delete game:", error);
      setError("Failed to delete game.");
    }
  };

  return (
    <Container>
      <h2 className="mt-4">My Games</h2>

      {/* Show the form only if logged in */}
      {userLoggedIn && (
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
      )}

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

                  {/* Show delete button only if logged in and it's the user's game */}
                  {userLoggedIn && game.creator === userId && ( // Use 'creator' not 'owner'
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

      {error && <p className="text-danger">{error}</p>}
    </Container>
  );
};

export default GamesPage;


