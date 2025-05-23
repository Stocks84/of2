import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import gameService from "../services/gameService";
import GameCard from "../components/GameCard";

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async (nextPage = 1) => {
    try {
      setLoading(true);
      const response = await gameService.getGames(nextPage, 6);
  
      setGames((prevGames) => {
        const existingIds = new Set(prevGames.map(game => game.id));
        const newGames = Array.isArray(response.results)
          ? response.results.filter(game => !existingIds.has(game.id))
          : [];

        return [...prevGames, ...newGames];  // Avoid duplicates
      });
  
      setHasMore(response.next !== null);
    } catch (error) {
      setError("Failed to load games. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreGames = () => {
    setPage((prevPage) => prevPage + 1);
    fetchGames(page + 1);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Drinking Games</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {games.map((game) => (
          <Col key={game.id} md={4} sm={6} xs={12} className="mb-3">
            <GameCard id={game.id} title={game.title} description={game.description} />
          </Col>
        ))}
      </Row>
      {loading && <Spinner animation="border" />}
      {hasMore && !loading && (
        <div className="text-center mt-3">
          <Button onClick={loadMoreGames} variant="primary">
            Load More
          </Button>
        </div>
      )}
    </Container>
  );
};

export default HomePage;
