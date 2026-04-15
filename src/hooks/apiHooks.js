import { useState, useEffect } from "react";
import fetchData from "../utils/fetchData";

// TODO: add necessary imports
const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const mediaItems = await fetchData(
          import.meta.env.VITE_MEDIA_API + "/media",
        );

        const mediaWithUsers = await Promise.all(
          mediaItems.map(async (item) => {
            try {
              const user = await fetchData(
                import.meta.env.VITE_AUTH_API + "/users/" + item.user_id,
              );

              return {
                ...item,
                username: user.username,
              };
            } catch {
              return {
                ...item,
                username: "unknown",
              };
            }
          }),
        );
        setMediaArray(mediaWithUsers);
      } catch (error) {
        console.error("fetchData error:", error);
      }
    };

    getMedia();
  }, []);

  return { mediaArray };
};

// login
const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    };

    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + "/auth/login",
      fetchOptions,
    );

    return loginResult;
  };

  return { postLogin };
};

// USER
const useUser = () => {
  // REGISTER
  const postUser = async (inputs) => {
    const response = await fetch(
      "https://media2.edu.metropolia.fi/auth-api/api/v1/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      },
    );

    const data = await response.json();
    return data;
  };

  // PROFILE TOKEN FETCH
  const getUserByToken = async (token) => {
    const response = await fetch(
      "https://media2.edu.metropolia.fi/auth-api/api/v1/users/token",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();
    return data.user;
  };

  return {
    postUser,
    getUserByToken,
  };
};

export { useMedia, useAuthentication, useUser };
