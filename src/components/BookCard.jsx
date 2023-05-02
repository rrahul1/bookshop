import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

function BookCard(props) {
  const firebase = useFirebase();
  const [imgUrl, setImgUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    firebase.getImage(props.imageUrl).then((url) => setImgUrl(url));
  }, [firebase, props.imageUrl]);

  return (
    <Card style={{ width: "18rem", margin: "25px" }}>
      <Card.Img variant="top" src={imgUrl} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          Book Name : {props.name} <br />
          Seller: {props.displayName}
        </Card.Text>
        <Button onClick={(e) => navigate(props.link)} variant="primary">
          View
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
