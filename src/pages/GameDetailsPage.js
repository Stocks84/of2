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
  const [liked, setLiked] = useState(false);
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");

  const userLoggedIn = isAuthenticated();
  const currentUsername = localStorage.getItem("username");

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setLoading(true);
        const gameData = await gameService.getGameById(id);
        setGame(gameData);
        setLiked(gameData.is_liked || false);
        const commentsData = await gameService.getComments(id);
        setComments(commentsData);
      } catch (err) {
        setError("Failed to load game details.");
      } finally {
        setLoading(false);
      }
    };
    fetchGameData();
  }, [id]);

  const handleLikeToggle = async () => {
    if (!userLoggedIn) {
      alert("Please log in to like this game.");
      return;
    }

    try {
      setLikeLoading(true);
      if (liked) {
        await gameService.unlikeGame(id);
        setLiked(false);
        setGame((prev) => ({ ...prev, likes_count: prev.likes_count - 1 }));
      } else {
        await gameService.likeGame(id);
        setLiked(true);
        setGame((prev) => ({ ...prev, likes_count: prev.likes_count + 1 }));
      }
    } catch (err) {
      console.error("Failed to toggle like:", err);
      setError("Unable to toggle like. Please try again.");
    } finally {
      setLikeLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setCommentSubmitting(true);
      const comment = await gameService.postComment(id, newComment);
      setComments((prev) => [...prev, comment]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment:", err);
      setError("Unable to post comment. Please try again.");
    } finally {
      setCommentSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    
    try {
      await gameService.deleteComment(commentId);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment:", err);
      setError("Unable to delete comment. Please try again.");
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.text);
  };

  const handleSaveEdit = async () => {
    if (!editText.trim()) return;

    try {
      await gameService.editComment(editingCommentId, editText);
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === editingCommentId ? { ...comment, text: editText } : comment
        )
      );
      setEditingCommentId(null);
      setEditText("");
    } catch (err) {
      console.error("Failed to edit comment:", err);
      setError("Unable to save comment. Please try again.");
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
            variant={liked ? "primary" : "outline-primary"}
            onClick={handleLikeToggle}
            disabled={likeLoading || !userLoggedIn}
          >
            👍 {liked ? "Unlike" : "Like"} ({game.likes_count || 0})
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
                <strong>{comment.user}</strong>:
                {editingCommentId === comment.id ? (
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="mt-2"
                  />
                ) : (
                  <p>{comment.text}</p>
                )}
                {userLoggedIn && comment.user === currentUsername && (
                  <div className="d-flex gap-2 mt-1">
                    {editingCommentId === comment.id ? (
                      <>
                        <Button size="sm" onClick={handleSaveEdit}>Save</Button>
                        <Button size="sm" variant="secondary" onClick={() => setEditingCommentId(null)}>Cancel</Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="outline-primary" onClick={() => handleEditComment(comment)}>Edit</Button>
                        <Button size="sm" variant="outline-danger" onClick={() => handleDeleteComment(comment.id)}>Delete</Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))
          )}

          {userLoggedIn ? (
            <Form onSubmit={handleCommentSubmit} className="mt-3">
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
              <Button type="submit" variant="success" className="mt-2" disabled={commentSubmitting}>
                {commentSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </Form>
          ) : (
            <Alert variant="info" className="mt-3">Log in to post a comment.</Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default GameDetailsPage;
