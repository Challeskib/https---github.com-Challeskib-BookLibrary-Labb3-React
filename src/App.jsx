import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/App.css";
import BookDetails from "./Components/BookDetails.jsx"; // Import the BookDetails component
import CreateBook from "./Components/CreateBook";
import DeleteBook from "./Components/DeleteBook"; // Import the DeleteBook component

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBookId, setSelectedBookId] = useState(null); // Track the selected book ID
  const [creatingBook, setCreatingBook] = useState(false); // Track if we are creating a new book
  const [successMessage, setSuccessMessage] = useState(null); // Track success message
  const [bookToDelete, setBookToDelete] = useState(null); // Track the book to delete
  const apiUrl = "https://localhost:7175/books";

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setBooks(response.data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Function to handle displaying book details
  const showBookDetails = (bookId) => {
    setSelectedBookId(bookId);
  };

  // Function to toggle creating a new book
  const toggleCreateBook = () => {
    setCreatingBook(!creatingBook);
    // Clear the success message when switching between creating and listing
    setSuccessMessage(null);
  };

  // Function to handle the book creation callback
  const handleBookCreated = (newBook) => {
    // Update the list of books with the newly created book
    setBooks([...books, newBook]);

    // Display the success message
    setSuccessMessage("Successfully created the book");

    // Clear the success message after a few seconds (e.g., 3 seconds)
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000); // 3 seconds
  };

  // Function to handle the delete button click and set the book to delete
  const handleDeleteBook = (bookId) => {
    setBookToDelete(bookId);
  };

  // Function to cancel the delete operation
  const cancelDelete = () => {
    setBookToDelete(null);
  };

  // Function to remove the book from the list when deleted
  const handleBookDeleted = (deletedBookId) => {
    // Filter out the deleted book from the books list
    setBooks(books.filter((book) => book.id !== deletedBookId));

    // Clear the selected book ID if it's the deleted book
    if (selectedBookId === deletedBookId) {
      setSelectedBookId(null);
    }

    // Clear the book to delete
    setBookToDelete(null);
  };

  return (
    <div>
      <h2>List of Books:</h2>
      <button onClick={toggleCreateBook}>
        {creatingBook ? "Back to List" : "Create New Book"}
      </button>
      {creatingBook ? (
        // Render form to create a new book and pass the callback
        <CreateBook onCreateBook={handleBookCreated} />
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <table className="book-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Year</th>
              <th>Loanable</th>
              <th>Details</th>
              <th>Delete</th>{" "}
              {/* Add a new column for the Delete button */}
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="book-row">
                <td>{book.title}</td>
                <td>{book.year}</td>
                <td>{book.loanAble ? "Yes" : "No"}</td>
                <td>
                  <button onClick={() => showBookDetails(book.id)}>
                    Details
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDeleteBook(book.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Conditional rendering of book details */}
      {selectedBookId && <BookDetails bookId={selectedBookId} />}

      {/* Conditional rendering of DeleteBook component */}
      {bookToDelete && (
        <DeleteBook
          bookId={bookToDelete}
          onDelete={handleBookDeleted}
        />
      )}

      {/* Display the success message */}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
};

export default App;
