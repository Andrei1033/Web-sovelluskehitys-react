import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useState } from "react";

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <div className="login-toggle">
        <button
          className="btn btn-ghost"
          onClick={() => setShowLogin(!showLogin)}
        >
          {showLogin ? "Go to Register" : "Go to Login"}
        </button>
      </div>

      <section className="form-area">
        {showLogin ? <LoginForm /> : <RegisterForm />}
      </section>
    </>
  );
};

export default Login;
