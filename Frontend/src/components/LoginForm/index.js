import "./styles.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTokenContext } from "../../Contexts/TokenContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setToken } = useTokenContext();
  const navigate = useNavigate();

  return (
    <form
      className="loginForm"
      onSubmit={async (event) => {
        try {
          event.preventDefault();

          const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const body = await res.json();

          if (!res.ok) {
            throw new Error(body.message);
          }

          setToken(body.authToken);
          toast.success(
            "Has iniciado sesión con éxito. ¡Bienvenido a Hack a Gram!"
          );
          navigate("/");
        } catch (error) {
          console.error(error.message);
          toast.error(error.message);
        }
      }}
    >
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button className="principal">Entrar a Hack a Gram</button>
    </form>
  );
};

export default LoginForm;
