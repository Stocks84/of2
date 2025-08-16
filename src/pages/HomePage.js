import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import gameService from "../services/gameService";
import GameCard from "../components/GameCard";
import Notification from "../components/Notification";

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: "", variant: "" });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => { fetchGames(); }, []);

  const fetchGames = async (nextPage = 1) => {
    try {
      setLoading(true);
      const response = await gameService.getGames(nextPage, 6);

      setGames((prevGames) => {
        const existingIds = new Set(prevGames.map((game) => game.id));
        const newGames = Array.isArray(response.results)
          ? response.results.filter((game) => !existingIds.has(game.id))
          : [];
        return [...prevGames, ...newGames];
      });

      setHasMore(response.next !== null);
    } catch (error) {
      setNotification({ message: "Failed to load games. Please try again later.", variant: "danger" });
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

      <Notification
        message={notification.message}
        variant={notification.variant}
        onClose={() => setNotification({ message: "", variant: "" })}
      />

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
