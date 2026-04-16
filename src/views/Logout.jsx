import { useEffect } from "react";
import { useUserContext } from "../hooks/contextHooks";

const Logout = () => {
  const { handleLogout } = useUserContext();

  useEffect(() => {
    handleLogout();
  }, []);

  return <h1>Logging out...</h1>;
};

export default Logout;
