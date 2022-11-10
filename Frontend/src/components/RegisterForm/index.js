import "./styles.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewUserForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <form
        className="registerUserForm"
        onSubmit={async (event) => {
          try {
            event.preventDefault();

            const newUser = { name, username, email, password };

            const res = await fetch(
              `${process.env.REACT_APP_API_URL}/register`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
              }
            );
            const body = await res.json();

            if (!res.ok) {
              throw new Error(body.message);
            }

            toast.success(body.message);
            navigate("/login");
          } catch (error) {
            console.error(error.message);
            toast.error(error.message);
          }
        }}
      >
        <label htmlFor="name">Nombre:</label>
        <input
          id="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <label htmlFor="username">Usuario:</label>
        <input
          id="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />

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

        <button className="principal">Crear cuenta</button>
      </form>
    </>
  );
};

export default NewUserForm;
