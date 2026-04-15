import { useEffect, useState } from "react";
import { useUser } from "../hooks/apiHooks";

const Profile = () => {

    const { getUserByToken } = useUser();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) return;

            const userData = await getUserByToken(token);
            setUser(userData);
        };

        fetchUser();
    }, []);

    if (!user) return <h1>No user logged in</h1>;

    return (
        <>
            <h1>Profile</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
        </>
    );
};

export default Profile;