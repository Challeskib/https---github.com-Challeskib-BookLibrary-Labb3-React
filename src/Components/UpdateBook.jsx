import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateBook = ({ bookId, onUpdateBook }) => {
  const [updatedBook, setUpdatedBook] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    axios
      .get(`https://localhost:7175/books/${bookId}`)
      .then((response) => {
        setUpdatedBook(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      });
  }, [bookId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setUpdatedBook({
      ...updatedBook,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdatedBook((updatedBook.bookId = bookId));
      const response = await axios.put(
        `https://localhost:7175/books`,
        updatedBook
      );

      if (onUpdateBook) {
        onUpdateBook(response.data.result);
        setSuccessMessage("Successfully updated the book");
      }
    } catch (error) {
      console.error("Error updating the book:", error);
    }
  };

  return (
    <div>
      <h2>Update Book : ID {bookId}</h2>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title" // Corrected the property name
            value={updatedBook.title || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Year:</label>
          <input
            type="number"
            name="year" // Corrected the property name
            value={updatedBook.year || 0}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Loanable:</label>
          <input
            type="checkbox"
            name="loanAble" // Corrected the property name
            checked={updatedBook.loanAble || false}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description" // Corrected the property name
            value={updatedBook.description || ""}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Author ID:</label>
          <input
            type="number"
            name="authorId" // Corrected the property name
            value={updatedBook.authorId || 0}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Genre ID:</label>
          <input
            type="number"
            name="genreId" // Corrected the property name
            value={updatedBook.genreId || 0}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBook;
