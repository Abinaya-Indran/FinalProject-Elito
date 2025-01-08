import React from 'react';

const Login = () => {
  return (
    <section className="login-container">
      <h1>Log In</h1>
      <br />
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">LOG IN</button>
        <br />
      </form>
      <a href="#">Forgot your password?</a>
      <br />
      <a href="#">Create account</a>
    </section>
  );
};

export default Login;
