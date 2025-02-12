import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../components/NavBar"; // Assuming NavBar is in components folder

const HomePage = () => {
    return (
      <Container className="mt-4">
        <h2 className="text-center">Welcome to OldFashion</h2>
        <p className="text-center">Explore fun drinking games below!</p>
        
        {/* Placeholder for games grid */}
        <Row className="mt-3">
          {[1, 2, 3, 4].map((game) => (
            <Col key={game} xs={12} md={6} lg={4} className="mb-4">
              <div className="p-3 border rounded text-center">
                <h5>Game {game}</h5>
                <p>Coming soon...</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    );
  };
  

export default HomePage;