import { Link } from "react-router-dom";
import "../css/register.css"; 
import axios from "axios";
import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  
  const usernameRegex = /^[a-zA-Z0-9]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usernameRegex.test(username)) {
      setError("Username must only contain letters and numbers, no spaces or symbols.");
      return;
    }
    if(!username || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError(""); // Clear error if valid
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        username,
        password
      });
  
      console.log("User registered:", response.data);
      setError("User registered successfully! You can now log in.");
      setUsername("");
      setPassword("");
      // Redirect to login or show success message here
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="register">
      
      <form onSubmit={handleSubmit}>
      <h1>Register</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            const value = e.target.value;
            
            if (/^[a-zA-Z0-9]*$/.test(value)) {
              setUsername(value);
            }
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" >Register</button>
        <p>Already a user? <Link to="/Login">Sign In</Link></p>
        {error && <p style={{ color: "tomato", marginTop: "0.5rem" }}>{error}</p>}
      </form>
    </div>
  );
}

export default Register;

