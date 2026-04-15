import { useState, useEffect } from "react";
import fetchData from "../utils/fetchData";

/* MEDIA */
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

/* LOGIN */
const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    };

    return await fetchData(
      import.meta.env.VITE_AUTH_API + "/auth/login",
      fetchOptions,
    );
  };

  return { postLogin };
};

/* USER */
const useUser = () => {
  const postUser = async (inputs) => {
    return await fetchData(import.meta.env.VITE_AUTH_API + "/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    });
  };

  const getUserByToken = async (token) => {
    return await fetchData(import.meta.env.VITE_AUTH_API + "/users/token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return { postUser, getUserByToken };
};

export { useMedia, useAuthentication, useUser };
