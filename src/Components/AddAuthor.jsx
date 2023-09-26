import React, { useState } from "react";
import axios from "axios";

const AddAuthor = ({ onAuthorAdded }) => {
  const [authorName, setAuthorName] = useState("");

  const handleAuthorNameChange = (e) => {
    setAuthorName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = "https://localhost:7175/authors";
    const newAuthor = { name: authorName };

    axios
      .post(apiUrl, newAuthor)
      .then((response) => {
        onAuthorAdded(response.data.result);
        setAuthorName("");
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
