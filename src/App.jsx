import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/App.css";
import BookDetails from "./Components/BookDetails.jsx";
import CreateBook from "./Components/CreateBook";
import DeleteBook from "./Components/DeleteBook";
import UpdateBook from "./Components/UpdateBook"; // Import the UpdateBook component

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [creatingBook, setCreatingBook] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [updatingBookId, setUpdatingBookId] = useState(null); // Track the book to update
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

  const showBookDetails = (bookId) => {
    setSelectedBookId(bookId);
  };

  const toggleCreateBook = () => {
    setCreatingBook(!creatingBook);
    setSuccessMessage(null);
  };

  const handleBookCreated = (newBook) => {
    setBooks([...books, newBook]);
    setSuccessMessage("Successfully created the book");

    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const handleDeleteBook = (bookId) => {
    setBookToDelete(bookId);
  };

  const cancelDelete = () => {
    setBookToDelete(null);
  };

  const handleBookDeleted = (deletedBookId) => {
    setBooks(books.filter((book) => book.id !== deletedBookId));

    if (selectedBookId === deletedBookId) {
      setSelectedBookId(null);
    }

    setBookToDelete(null);
  };

  const handleUpdateBook = (bookId) => {
    setUpdatingBookId(bookId);
  };

  // Function to handle the update callback
  const handleBookUpdated = (updatedBook) => {
    // Find the index of the updated book in the books array
    const updatedBookIndex = books.findIndex(
      (book) => book.id === updatedBook.id
    );

    // Create a copy of the books array with the updated book
    const updatedBooks = [...books];
    updatedBooks[updatedBookIndex] = updatedBook;

    // Update the local state with the updated books
    setBooks(updatedBooks);

    // Clear the selected book for update
    setUpdatingBookId(null);
  };

  return (
    <div>
      <h2>List of Books:</h2>
      <button onClick={toggleCreateBook}>
        {creatingBook ? "Back to List" : "Create New Book"}
      </button>
      {creatingBook ? (
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
              <th>Delete</th>
              <th>Update</th>
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
                <td>
                  <button onClick={() => handleUpdateBook(book.id)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedBookId && <BookDetails bookId={selectedBookId} />}
      {bookToDelete && (
        <DeleteBook
          bookId={bookToDelete}
          onDelete={handleBookDeleted}
        />
      )}

      {/* Conditional rendering of UpdateBook component */}
      {updatingBookId && (
        <UpdateBook
          bookId={updatingBookId}
          onUpdateBook={handleBookUpdated}
        />
      )}

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
};

export default App;
