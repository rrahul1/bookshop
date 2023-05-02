import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleSigIn = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    await firebase.signinWithEmailPassword(email, password);
    console.log("login sucessfull");
  };

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);

  return (
    <div className="container mt-5">
      <form onSubmit={handleSigIn}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <h1 className="mt-5 mb-5">OR</h1>
      <Button onClick={firebase.signinWithGoogle} variant="danger">
        SignIn with Google
      </Button>
    </div>
  );
}

export default SignIn;
