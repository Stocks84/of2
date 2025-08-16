import React from "react";
import { Alert } from "react-bootstrap";

const Notification = ({ message, variant, onClose }) => {
  if (!message) return null;

  return (
    <Alert 
      variant={variant || "info"} 
      dismissible 
      onClose={onClose}
      className="mt-3"
    >
      {message}
    </Alert>
  );
};

export default Notification;
