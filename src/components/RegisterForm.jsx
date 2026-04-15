import { useState, useEffect } from "react";
import useForm from "../hooks/formHooks";
import { useUser, useAuthentication } from "../hooks/apiHooks";
import fetchData from "../utils/fetchData";
import { useNavigate } from "react-router";

const RegisterForm = () => {
  const { postUser } = useUser();
  const { postLogin } = useAuthentication();
  const navigate = useNavigate();
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

      // 1. Rekisteröidy
      const registerResult = await postUser(userData);
      //console.log("REGISTER RESULT:", registerResult);

      if (registerResult) {
        // 2. Kirjaudu automaattisesti sisään
        const loginResult = await postLogin({
          username: inputs.username,
          password: inputs.password,
        });

        //console.log("AUTO LOGIN RESULT:", loginResult);

        if (loginResult.token) {
          localStorage.setItem("token", loginResult.token);
          navigate("/"); // Ohjaa etusivulle
        }
      }
    } catch (err) {
      console.error("Register or auto-login failed:", err);
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

      {registerError && <p style={{ color: "red" }}>{registerError}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            name="username"
            value={inputs.username}
            onChange={handleInputChange}
          />
          <p>{usernameStatus}</p>
        </div>

        <div>
          <label>Email</label>
          <input
            name="email"
            value={inputs.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={inputs.password}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
