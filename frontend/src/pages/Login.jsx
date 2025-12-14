// import { useState } from "react";
// import { loginUser } from "../api/auth";
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
//   const { login } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await loginUser({ email, password });
//       login(res.data.token);
//       alert("Login successful");
//     } catch (err) {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>

//       <input
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await loginUser({ email, password });
    login(res.token, res.role);
  } catch (err) {
    setError("Invalid credentials");
  }
};


  return (
    <AuthLayout>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don’t have an account?{" "}
        <Link to="/register">Sign up</Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
