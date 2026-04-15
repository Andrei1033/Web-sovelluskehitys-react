import { useEffect, useState } from "react";
import { useUser } from "../hooks/apiHooks";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { getUserByToken } = useUser();

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");
      const userResponse = await getUserByToken(token);
      setUser(userResponse.user);
    };

    getUser();
  }, [getUserByToken]);

  return (
    <section className="profile-view">
      <div className="profile-backdrop" aria-hidden="true" />

      {user ? (
        <article className="profile-card">
          <p className="profile-kicker">Account</p>
          <h2 className="profile-title">{user.username}</h2>

          <dl className="profile-grid">
            <div className="profile-row">
              <dt>Email</dt>
              <dd>{user.email}</dd>
            </div>

            <div className="profile-row">
              <dt>Member since</dt>
              <dd>{new Date(user.created_at).toLocaleString("fi-FI")}</dd>
            </div>
          </dl>
        </article>
      ) : (
        <article className="profile-card profile-card-loading">
          <p className="profile-kicker">Loading</p>
          <h2 className="profile-title">Fetching profile&hellip;</h2>
        </article>
      )}
    </section>
  );
};
export default Profile;
