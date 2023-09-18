import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/App.css";
import BookDetails from "./Components/BookDetails.jsx";
import CreateBook from "./Components/CreateBook";
import DeleteBook from "./Components/DeleteBook";
import UpdateBook from "./Components/UpdateBook";

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [creatingBook, setCreatingBook] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingBookId, setUpdatingBookId] = useState(null);
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
    setIsUpdating(false);
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
    setIsUpdating(false);
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
    setIsUpdating(true);
  };

  const handleBackToList = () => {
    setSelectedBookId(null);
    setBookToDelete(null);
    setUpdatingBookId(null);
    setIsUpdating(false);
  };

  const handleBookUpdated = (updatedBook) => {
    const updatedBooks = books.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    );

    setBooks(updatedBooks);
    setIsUpdating(false);
  };

  return (
    <div>
      {selectedBookId && !isUpdating && (
        <div>
          <BookDetails bookId={selectedBookId} />
          <button onClick={handleBackToList}>Back to List</button>
        </div>
      )}
      {bookToDelete && (
        <div>
          <DeleteBook
            bookId={bookToDelete}
            onDelete={handleBookDeleted}
          />
          <button onClick={handleBackToList}>Back to List</button>
        </div>
      )}
      {isUpdating && updatingBookId && (
        <div>
          <UpdateBook
            bookId={updatingBookId}
            onUpdateBook={handleBookUpdated}
          />
          <button onClick={handleBackToList}>Back to List</button>
        </div>
      )}
      {!selectedBookId && !bookToDelete && !isUpdating && (
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
                <tr className="">
                  <th>Title</th>
                  <th>Year</th>
                  <th>Loanable</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} className="book-row">
                    <td>{book.title}</td>
                    <td>{book.year}</td>
                    <td>{book.loanAble ? "Yes" : "No"}</td>
                    <td>
                      <button
                        className="details-button"
                        onClick={() => showBookDetails(book.id)}
                      >
                        Details
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => handleDeleteBook(book.id)}
                      >
                        Delete
                      </button>

                      <button
                        className="update-button"
                        onClick={() => handleUpdateBook(book.id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
};

export default App;
