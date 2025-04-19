import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Spinner, Alert, Form } from "react-bootstrap";
import gameService from "../services/gameService";
import { isAuthenticated } from "../services/authService";

const GameDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likeLoading, setLikeLoading] = useState(false);
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  const userLoggedIn = isAuthenticated();

  const fetchGameData = async () => {
    try {
      const gameData = await gameService.getGameById(id);
      setGame(gameData);
    } catch (err) {
      setError("Failed to load game details.");
    }
  };

  const fetchComments = async () => {
    try {
      const commentsData = await gameService.getComments(id);
      setComments(commentsData);
    } catch (err) {
      console.error("Failed to load comments:", err);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await fetchGameData();
      await fetchComments();
      setLoading(false);
    };
    fetchAll();
  }, [id]);

  const handleLike = async () => {
    if (!userLoggedIn) {
      alert("Please log in to like this game.");
      return;
    }

    try {
      setLikeLoading(true);
      await gameService.likeGame(id);
      await fetchGameData(); // Refresh game data to get updated like count
    } catch (err) {
      console.error("Failed to like game:", err);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setCommentSubmitting(true);
      await gameService.postComment(id, newComment);
      setNewComment("");
      await fetchComments();
    } catch (err) {
      console.error("Failed to post comment:", err);
    } finally {
      setCommentSubmitting(false);
    }
  };

  if (loading) return <Spinner animation="border" className="mt-4" />;
  if (error) return <Alert variant="danger" className="mt-4">{error}</Alert>;

  return (
    <div className="container mt-4">
      <Button variant="secondary" onClick={() => navigate("/")}>← Back</Button>

      <Card className="mt-3">
        <Card.Body>
          <Card.Title>{game.title}</Card.Title>
          <Card.Text>{game.description}</Card.Text>
          <p><strong>Created by:</strong> {game.creator}</p>
          <Button
            variant="outline-primary"
            onClick={handleLike}
            disabled={likeLoading || !userLoggedIn}
          >
            👍 Like ({game.likes_count || 0})
          </Button>
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Header>Comments</Card.Header>
        <Card.Body>
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="mb-3 border-bottom pb-2">
                <strong>{comment.user}</strong>: {comment.text}
              </div>
            ))
          )}

          {userLoggedIn ? (
            <Form onSubmit={handleCommentSubmit} className="mt-3">
              <Form.Group controlId="newComment">
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                />
              </Form.Group>
              <Button
                type="submit"
                variant="success"
                disabled={commentSubmitting}
                className="mt-2"
              >
                {commentSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </Form>
          ) : (
            <Alert variant="info" className="mt-3">
              Log in to post a comment.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default GameDetailsPage;


