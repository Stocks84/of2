import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import GameCard from "../components/GameCard";


const sampleGames = [
  {
    id: 1,
    title: "Kings Cup",
    description: "A classic drinking game with cards.",
    rules: "Each card has a rule, last king drinks the cup.",
  },
  {
    id: 2,
    title: "Beer Pong",
    description: "Throw a ball into the cup!",
    rules: "Make a shot, other team drinks.",
  },
  {
    id: 3,
    title: "Flip Cup",
    description: "Teams race to flip their cups after drinking.",
    rules: "Drink, flip, pass. First team wins!",
  },
];

const HomePage = () => {
  return (
    <Container>
      <h1 className="text-center my-4">Drinking Games</h1>
      <Row>
        {sampleGames.map((game) => (
          <Col key={game.id} sm={12} md={6} lg={4}>
            <GameCard
              title={game.title}
              description={game.description}
              rules={game.rules}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
