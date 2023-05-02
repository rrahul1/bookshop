import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

function OrderDetails() {
  const params = useParams();
  const firebase = useFirebase();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    firebase.fetchOrder(params.bookId).then((orders) => setOrders(orders.docs));
  }, [firebase, params.bookId]);

  return (
    <div
      className="container mt-5"
      style={{ border: "1px solid black", padding: "10px" }}
    >
      <h1>Orders</h1>
      <div>
        {orders.map((order) => {
          const oData = order.data();
          return (
            <div key={order.id}>
              <h5>Order By: {oData.username}</h5>
              <h6>Quantity: {oData.quantity}</h6>
              <h6>Quantity: {oData.userEmail}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderDetails;
