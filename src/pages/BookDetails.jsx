import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

function BookDetails() {
  const firebase = useFirebase();
  const params = useParams();
  const [data, setData] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    firebase.getBookById(params.bookId).then((id) => setData(id.data()));
  }, [firebase, params.bookId]);

  useEffect(() => {
    if (data) {
      const imageURL = data.imageUrl;
      firebase.getImage(imageURL).then((url) => setImgUrl(url));
    }
  }, [data, firebase]);

  if (data === null) {
    return <h1>Loading...</h1>;
  }

  const handlePlaceOrder = async () => {
    const res = await firebase.placeOrder(params.bookId, quantity);
    console.log(res);
  };

  return (
    <div className="container mt-5">
      <h1>{data.name}</h1>
      <img
        src={imgUrl}
        style={{ width: "50%", borderRadius: "10px" }}
        alt="book"
      />
      <h2>Details</h2>
      <h4>Price: {data.price}Rs</h4>
      <h4>ISBN No. : {data.isbn}</h4>
      <h2>Seller</h2>
      <h4>Name: {data.displayName}</h4>
      <h4>Email: {data.userEmail}</h4>
      <div className="mb-3">
        <label htmlFor="exampleInputQuantity1" className="form-label">
          Quantity
        </label>
        <input
          type="number"
          className="form-control"
          id="exampleInputQuantity1"
          placeholder="Enter Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <Button onClick={handlePlaceOrder} variant="success">
        Buy Now
      </Button>
    </div>
  );
}

export default BookDetails;
