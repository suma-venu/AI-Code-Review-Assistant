import "../styles/Register.css";

function Register() {
  return (
    <div className="register-container">

      <form className="register-form">

        <h2>Register</h2>

        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
        />

        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm your password"
        />

        <button type="submit">
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;