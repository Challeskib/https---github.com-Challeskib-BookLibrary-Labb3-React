// BookDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const BookDetails = ({ bookId }) => {
  const [book, setBook] = useState(null);
  const apiUrl = `https://localhost:7175/books/${bookId}`;

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setBook(response.data.result); // Assuming the API returns the book details
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      });
  }, [apiUrl]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Book Details: ID: {bookId}</h2>
      <p>Title: {book.title}</p>
      <p>Description: {book.description}</p>
      <p>Year: {book.year}</p>
      <p>Author: {book.author.name}</p>
      <p>Genre: {book.genre.name}</p>
      <p>Loanable: {book.loanAble ? "Yes" : "No"}</p>
    </div>
  );
};

export default BookDetails;
