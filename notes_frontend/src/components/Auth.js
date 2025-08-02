import React, { useState } from "react";
import "../App.css";

// PUBLIC_INTERFACE
function Auth({ onLogin }) {
  // Minimal authentication UI (for actual app, integrate Supabase/Auth API)
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(null);

  // PUBLIC_INTERFACE
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && pwd) {
      // Fake successful auth. Replace with call to auth API in future
      onLogin({ email });
    } else {
      setError("Please enter email & password.");
    }
  };

  return (
    <form className="authBox" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <input
        className="input"
        type="email"
        autoFocus
        required
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="input"
        type="password"
        required
        placeholder="Password"
        value={pwd}
        onChange={e => setPwd(e.target.value)}
      />
      {error && <div className="errorMsg">{error}</div>}
      <button className="btn primary" type="submit">Login</button>
      <div className="helpText">This is a demo. Any email is accepted.</div>
    </form>
  );
}
export default Auth;
