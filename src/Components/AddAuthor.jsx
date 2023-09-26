import React, { useState } from "react";
import axios from "axios";

const AddAuthor = ({ onAuthorAdded }) => {
  const [authorName, setAuthorName] = useState("");

  const handleAuthorNameChange = (e) => {
    setAuthorName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming you have an API endpoint for adding authors
    // Replace 'apiUrl' with the actual endpoint
    const apiUrl = "https://localhost:7175/authors"; // Update with your API URL
    const newAuthor = { name: authorName };

    // Send a POST request to add the author
    // You can use Axios or any other library you prefer
    axios
      .post(apiUrl, newAuthor)
      .then((response) => {
        onAuthorAdded(response.data.result); // Notify the parent component about the new author
        setAuthorName(""); // Clear the input field
      })
      .catch((error) => {
        console.error("Error adding author:", error);
      });
  };

  return (
    <div>
      <h2>Add Author</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Author Name:
          <input
            type="text"
            value={authorName}
            onChange={handleAuthorNameChange}
            required
          />
        </label>
        <button type="submit">Add Author</button>
      </form>
    </div>
  );
};

export default AddAuthor;
