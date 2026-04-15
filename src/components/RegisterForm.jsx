import useForm from "../hooks/formHooks";
import { useUser } from "../hooks/apiHooks";

const RegisterForm = () => {
  const { postUser } = useUser();

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
      const result = await postUser(inputs);
      console.log("REGISTER RESULT:", result);
    } catch (err) {
      console.error("Register failed:", err);
    }
  }

  return (
    <>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            name="username"
            value={inputs.username}
            onChange={handleInputChange}
          />
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
