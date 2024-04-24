import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/users";
import { loginUser } from "../../helpers/authHelper";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(formData);
    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate("/");
    }
  };

  return (
    <div style={{
      margin: "auto",
      width: "100%",
      maxWidth: "400px",
      padding: "20px",
      backgroundColor: "#1a1a1a",
      color: "#f0f0f0",
      borderRadius: "8px",
      marginTop: "20px"
    }}>
      <h1 style={{ marginBottom: "20px", textAlign: "center", color: "#ffffff" }}>
        <a href="/" style={{ textDecoration: "none", color: "#1ABC9C" }}>
          BuddyVibes
        </a>
      </h1>
      <h2 style={{ marginBottom: "10px", textAlign: "center" }}>Login</h2>
      <p style={{ textAlign: "center" }}>
        Don't have an account yet?{" "}
        <a href="/signup" style={{ color: "#6699ff", textDecoration: "underline" }}>
          Sign Up
        </a>
      </p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }} htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #333",
              backgroundColor: "#333",
              color: "#f0f0f0"
            }}
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }} htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #333",
              backgroundColor: "#333",
              color: "#f0f0f0"
            }}
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {serverError && <p style={{ color: 'red', marginBottom: '10px' }}>{serverError}</p>}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#1ABC9C",
            color: "#ffffff",
            cursor: "pointer"
          }}>
          Login
        </button>
      </form>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <p>&copy; {new Date().getFullYear()} BuddyVibes</p>
      </div>
    </div>
  );
};

export default LoginPage;
