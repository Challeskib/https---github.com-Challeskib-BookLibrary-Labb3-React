import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateBook = ({ onCreateBook }) => {
  const [newBook, setNewBook] = useState({
    Title: "",
    Description: "",
    Year: 0,
    LoanAble: false,
    AuthorId: 0,
    GenreId: 0,
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [authors, setAuthors] = useState([]); // State for authors
  const [genres, setGenres] = useState([]); // State for genres

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7175/books",
        newBook
      );

      if (onCreateBook) {
        onCreateBook(response.data.result);
        setSuccessMessage("Successfully created the book");
        setNewBook({
          Title: "",
          Description: "",
          Year: 0,
          LoanAble: false,
          AuthorId: 0,
          GenreId: 0,
        });

        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error creating the book:", error);
    }
  };

  useEffect(() => {
    // Fetch authors when the component mounts
    axios
      .get("https://localhost:7175/authors") // Replace with your actual endpoint
      .then((response) => {
        setAuthors(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching authors:", error);
      });

    // Fetch genres when the component mounts
    axios
      .get("https://localhost:7175/genres") // Replace with your actual endpoint
      .then((response) => {
        setGenres(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching genres:", error);
      });
  }, []); // Empty dependency array to run this effect only once

  return (
    <div>
      <h2>Create a New Book</h2>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="Title"
            value={newBook.Title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="Description"
            value={newBook.Description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Year:</label>
          <input
            type="number"
            name="Year"
            value={newBook.Year}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Loanable:</label>
          <input
            type="checkbox"
            name="LoanAble"
            checked={newBook.LoanAble}
            onChange={() =>
              setNewBook({ ...newBook, LoanAble: !newBook.LoanAble })
            }
          />
        </div>
        <div>
          <label>Author:</label>
          <select
            name="AuthorId"
            value={newBook.AuthorId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select an Author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Genre ID:</label>
          <select
            name="GenreId"
            value={newBook.GenreId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateBook;

// import React, { useState } from "react";
// import axios from "axios";

// const CreateBook = ({ onCreateBook }) => {
//   const [newBook, setNewBook] = useState({
//     Title: "",
//     Description: "",
//     Year: 0,
//     LoanAble: false,
//     AuthorId: 0,
//     GenreId: 0,
//   });
//   const [successMessage, setSuccessMessage] = useState(null); // State for success message

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewBook({
//       ...newBook,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send a POST request to your API to create the new book
//       const response = await axios.post(
//         "https://localhost:7175/books",
//         newBook
//       );

//       // Assuming your API returns the created book, you can pass it to a callback
//       if (onCreateBook) {
//         onCreateBook(response.data.result);

//         // Display success message
//         setSuccessMessage("Successfully created the book");

//         // Clear the form
//         setNewBook({
//           Title: "",
//           Description: "",
//           Year: 0,
//           LoanAble: false,
//           AuthorId: 0,
//           GenreId: 0,
//         });

//         // Clear success message after a few seconds (e.g., 3 seconds)
//         setTimeout(() => {
//           setSuccessMessage(null);
//         }, 3000); // 3 seconds
//       }
//     } catch (error) {
//       console.error("Error creating the book:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Create a New Book</h2>
//       {successMessage && (
//         <div className="success-message">{successMessage}</div>
//       )}
//       <form onSubmit={handleSubmit}></form>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             name="Title"
//             value={newBook.Title}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea
//             name="Description"
//             value={newBook.Description}
//             onChange={handleInputChange}
//             required
//           ></textarea>
//         </div>
//         <div>
//           <label>Year:</label>
//           <input
//             type="number"
//             name="Year"
//             value={newBook.Year}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Loanable:</label>
//           <input
//             type="checkbox"
//             name="LoanAble"
//             checked={newBook.LoanAble}
//             onChange={() =>
//               setNewBook({ ...newBook, LoanAble: !newBook.LoanAble })
//             }
//           />
//         </div>
//         <div>
//           <label>Author ID:</label>
//           <input
//             type="number"
//             name="AuthorId"
//             value={newBook.AuthorId}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Genre ID:</label>
//           <input
//             type="number"
//             name="GenreId"
//             value={newBook.GenreId}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div>
//           <button type="submit">Create</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateBook;
