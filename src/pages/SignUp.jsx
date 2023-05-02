import React, { useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    await firebase.signupWithEmailPassword(email, password);
  };

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);

  return (
    <div className="container mt-5">
      <form onSubmit={handleSignup}>
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
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
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
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignUp;
