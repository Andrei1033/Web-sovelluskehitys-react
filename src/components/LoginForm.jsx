import useForm from "../hooks/formHooks";
import { useAuthentication } from "../hooks/apiHooks";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const { postLogin } = useAuthentication();
  const navigate = useNavigate();

  const initValues = {
    username: "",
    password: "",
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(
    doLogin,
    initValues,
  );

  async function doLogin() {
    try {
      const result = await postLogin(inputs);

      console.log("LOGIN RESULT", result);

      if (result.token) {
        localStorage.setItem("token", result.token);
        navigate("/");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  }

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginuser">Username</label>
          <input
            name="username"
            type="text"
            id="loginuser"
            value={inputs.username}
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>

        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            value={inputs.password}
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
