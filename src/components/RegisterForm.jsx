import { useState, useEffect } from "react";
import useForm from "../hooks/formHooks";
import { useUser } from "../hooks/apiHooks";
import fetchData from "../utils/fetchData";
import { useUserContext } from "../hooks/contextHooks";

const RegisterForm = () => {
  const { postUser } = useUser();
  const { handleLogin } = useUserContext();
  const [usernameStatus, setUsernameStatus] = useState("");
  const [registerError, setRegisterError] = useState("");

  const initValues = {
    username: "",
    password: "",
    email: "",
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(
    doRegister,
    initValues,
  );

  async function doRegister() {
    try {
      setRegisterError("");

      const userData = {
        username: inputs.username,
        password: inputs.password,
        email: inputs.email,
      };

      await postUser(userData);

      // 🔥 Context hoitaa loginin
      await handleLogin({
        username: inputs.username,
        password: inputs.password,
      });
    } catch (err) {
      console.error(err);
      setRegisterError(
        "Rekisteröinti tai automaattinen kirjautuminen epäonnistui",
      );
    }
  }

  /* LIVE USERNAME CHECK */
  useEffect(() => {
    if (!inputs.username) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUsernameStatus("");
      return;
    }

    const checkUsername = async () => {
      try {
        const users = await fetchData(import.meta.env.VITE_AUTH_API + "/users");

        const exists = users.find(
          (user) =>
            user.username.toLowerCase() === inputs.username.toLowerCase(),
        );

        if (exists) {
          setUsernameStatus("❌ Username taken");
        } else {
          setUsernameStatus("✅ Username available");
        }
      } catch (err) {
        console.log(err);
      }
    };

    const timer = setTimeout(checkUsername, 400);

    return () => clearTimeout(timer);
  }, [inputs.username]);

  return (
    <>
      <h1>Register</h1>

      {registerError && <p className="error-text">{registerError}</p>}

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Username</label>
          <input
            className="input"
            name="username"
            value={inputs.username}
            onChange={handleInputChange}
          />
          <p className="muted">{usernameStatus}</p>
        </div>

        <div className="form-row">
          <label>Email</label>
          <input
            className="input"
            name="email"
            value={inputs.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <label>Password</label>
          <input
            className="input"
            name="password"
            type="password"
            value={inputs.password}
            onChange={handleInputChange}
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
