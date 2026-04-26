import { Link, Outlet } from "react-router";
import { useEffect } from "react";
import { useUserContext } from "../hooks/contextHooks";

const Layout = () => {
  // eslint-disable-next-line no-unused-vars
  const { handleAutoLogin, user } = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <nav className="mb-5 rounded-xl p-3 bg-gradient-to-r from-orange-500/10 to-transparent shadow-inner">
        <ul className="flex gap-3 items-center *:text-yellow-300">
          <li>
            <Link to="/" className="px-3 py-2 rounded-lg hover:bg-orange-500/10 hover:text-white transition">
              Home
            </Link>
          </li>

          {user && (
            <>
              <li>
                <Link to="/profile" className="px-3 py-2 rounded-lg hover:bg-orange-500/10 hover:text-white">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/upload" className="px-3 py-2 rounded-lg hover:bg-orange-500/10 hover:text-white">
                  Upload
                </Link>
              </li>
              <li>
                <Link to="/logout" className="px-3 py-2 rounded-lg hover:bg-orange-500/10 hover:text-white">
                  Logout
                </Link>
              </li>
            </>
          )}

          {!user && (
            <li>
              <Link to="/login" className="px-3 py-2 rounded-lg hover:bg-orange-500/10 hover:text-white">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
