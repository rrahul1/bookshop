import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import CardGroup from "react-bootstrap/CardGroup";
import BookCard from "../components/BookCard";

function Home() {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase.getBooks().then((books) => setBooks(books.docs));
  }, [firebase]);

  return (
    <div className="container mt-5">
      <CardGroup>
        {books.map((book, i) => (
          <BookCard
            link={`books/view/${book.id}`}
            key={i}
            id={book.id}
            {...book.data()}
          />
        ))}
      </CardGroup>
    </div>
  );
}

export default Home;
