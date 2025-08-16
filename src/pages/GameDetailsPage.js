import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Spinner, Alert, Form } from "react-bootstrap";
import gameService from "../services/gameService";
import { isAuthenticated } from "../services/authService";
import Notification from "../components/Notification";
import theme from "../theme";
import "../CustomStyles.css";

const GameDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  const [notification, setNotification] = useState({ message: "", variant: "" });

  const userLoggedIn = isAuthenticated();
  const currentUsername = localStorage.getItem("username");

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setLoading(true);
        const gameData = await gameService.getGameById(id);
        setGame(gameData);
        setLiked(gameData?.is_liked || false);
        const commentsData = await gameService.getComments(id);
        setComments(commentsData);
      } catch (err) {
        setNotification({ message: "Failed to load game details.", variant: "danger" });
      } finally {
        setLoading(false);
      }
    };
    fetchGameData();
  }, [id]);

  const handleLikeToggle = async () => {
    if (!userLoggedIn) {
      setNotification({ message: "Please log in to like this game.", variant: "info" });
      return;
    }
    setLikeLoading(true);
    try {
      if (liked) {
        await gameService.unlikeGame(id);
        setLiked(false);
        setGame((prev) => ({ ...prev, likes_count: prev.likes_count - 1 }));
        setNotification({ message: "You unliked this game.", variant: "success" });
      } else {
        await gameService.likeGame(id);
        setLiked(true);
        setGame((prev) => ({ ...prev, likes_count: prev.likes_count + 1 }));
        setNotification({ message: "You liked this game.", variant: "success" });
      }
    } catch (err) {
      setNotification({ message: "Could not process like/unlike.", variant: "danger" });
    } finally {
      setLikeLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setCommentSubmitting(true);
    try {
      const comment = await gameService.postComment(id, newComment);
      setComments([...comments, comment]);
      setNewComment("");
      setNotification({ message: "Comment added.", variant: "success" });
    } catch (err) {
      setNotification({ message: "Failed to add comment.", variant: "danger" });
    } finally {
      setCommentSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      await gameService.deleteComment(commentId);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
      setNotification({ message: "Comment deleted.", variant: "success" });
    } catch {
      setNotification({ message: "Failed to delete comment.", variant: "danger" });
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
      setNotification({ message: "Comment updated.", variant: "success" });
    } catch {
      setNotification({ message: "Failed to save comment.", variant: "danger" });
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditText("");
  };

  if (loading) return <Spinner className="m-4" />;

  return (
    <div className="container mt-4">
      <Notification
        message={notification.message}
        variant={notification.variant}
        onClose={() => setNotification({ message: "", variant: "" })}
      />

      <Button
        onClick={() => navigate("/")}
        style={{ backgroundColor: theme.primaryColor, color: theme.textColor }}
      >
        ← Back
      </Button>

      <Card className="mt-4" style={{ backgroundColor: theme.secondaryColor, color: theme.textColor }}>
        <Card.Body>
          <Card.Title>{game?.title}</Card.Title>
          <Card.Text>{game?.description}</Card.Text>
          <p><strong>Created by:</strong> {game?.creator}</p>
          <p><strong>Rules:</strong> {game?.rules}</p>
          <Button
            onClick={handleLikeToggle}
            disabled={likeLoading}
            style={{
              backgroundColor: liked ? theme.primaryColor : theme.secondaryColor,
              color: liked ? "#fff" : theme.textColor,
              borderColor: liked ? theme.primaryColor : theme.textColor
            }}
          >
            👍 {liked ? "Unlike" : "Like"} ({game?.likes_count || 0})
          </Button>
        </Card.Body>
      </Card>

      <Card className="mt-4" style={{ backgroundColor: theme.secondaryColor, color: theme.textColor }}>
        <Card.Header style={{ backgroundColor: theme.primaryColor, color: theme.textColor }}>
          Comments
        </Card.Header>
        <Card.Body>
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="mb-3 border-bottom pb-2">
                <strong>{comment.user}</strong>:
                {editingCommentId === comment.id ? (
                  <>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
                    />
                    <Button onClick={handleSaveEdit} className="mt-2" style={{ backgroundColor: theme.primaryColor, color: theme.textColor }}>Save</Button>
                    <Button onClick={handleCancelEdit} variant="secondary" className="mt-2 ms-2">Cancel</Button>
                  </>
                ) : (
                  <p>{comment.text}</p>
                )}

                {userLoggedIn && comment.user === currentUsername && !editingCommentId && (
                  <div className="d-flex gap-2 mt-1">
                    <Button onClick={() => handleEditComment(comment)} style={{ backgroundColor: theme.primaryColor, color: theme.textColor }}>Edit</Button>
                    <Button onClick={() => handleDeleteComment(comment.id)} variant="danger">Delete</Button>
                  </div>
                )}
              </div>
            ))
          )}

          {userLoggedIn ? (
            <Form onSubmit={handleCommentSubmit} className="mt-3">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="custom-placeholder"
                style={{ backgroundColor: theme.backgroundColor, color: theme.textColor, borderColor: "#444" }}
              />
              <Button
                type="submit"
                className="mt-2 w-100"
                disabled={commentSubmitting}
                style={{ backgroundColor: theme.primaryColor, color: theme.textColor }}
              >
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

