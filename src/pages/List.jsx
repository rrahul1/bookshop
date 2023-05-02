import React from "react";
import { useFirebase } from "../context/Firebase";

function List() {
  const firebase = useFirebase();

  const handleAddBookList = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const isbn = e.target[1].value;
    const price = e.target[2].value;
    const cover = e.target[3].files[0];
    await firebase.createNewBookList(name, isbn, price, cover);
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleAddBookList}>
        <div className="mb-3">
          <label htmlFor="exampleInputBook1" className="form-label">
            Enter Book Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputBook1"
            aria-describedby="bookHelp"
            placeholder="Enter Book Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputIsbn1" className="form-label">
            ISBN
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputIsbn1"
            placeholder="ISBN Number"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPrice1" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPrice1"
            placeholder="Price"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputFile1" className="form-label">
            Cover Photo
          </label>
          <input type="file" className="form-control" id="exampleInputFile1" />
        </div>

        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}

export default List;
