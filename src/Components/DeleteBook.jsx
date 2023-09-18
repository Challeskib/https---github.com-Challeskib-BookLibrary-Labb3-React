import React from "react";
import axios from "axios";

const DeleteBook = ({ bookId, onDelete }) => {
  const handleDelete = async () => {
    try {
      // Send a DELETE request to your API to delete the book
      await axios.delete(`https://localhost:7175/books/${bookId}`);

      // Trigger the onDelete callback to remove the book from the list
      if (onDelete) {
        onDelete(bookId);
      }
    } catch (error) {
      console.error("Error deleting the book:", error);
    }
  };

  return (
    <div>
      <p>Are you sure you want to delete book with Id {bookId}?</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteBook;
