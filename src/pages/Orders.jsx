import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/BookCard";

function Orders() {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (firebase.isLoggedIn)
      firebase
        .fetchBooks(firebase.user.uid)
        ?.then((book) => setBooks(book.docs));
  }, [firebase]);

  if (!firebase.isLoggedIn) return <h1>Please Log In... !</h1>;

  return (
    <div className="container">
      {books.map((book) => (
        <BookCard
          link={`/books/orders/${book.id}`}
          key={book.id}
          id={book.id}
          {...book.data()}
        />
      ))}
    </div>
  );
}

export default Orders;
