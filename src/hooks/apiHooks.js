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

  const postMedia = async (fileData, inputs, token) => {
    const mediaObject = {
      title: inputs.title,
      description: inputs.description,
      filename: fileData.data.filename,
      filesize: fileData.data.filesize,
      media_type: fileData.data.media_type,
    };

    return await fetchData(import.meta.env.VITE_MEDIA_API + "/media", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(mediaObject),
    });
  };

  return { mediaArray, postMedia };
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

// FILE UPLOAD
const useFile = () => {
  const postFile = async (file, token) => {
    //FormData
    const formData = new FormData();

    //add file
    formData.append("file", file);

    //upload
    const response = await fetch(
      import.meta.env.VITE_UPLOAD_SERVER + "/upload",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error("File upload failed");
    }

    //return uploaded file data
    return await response.json();
  };

  return { postFile };
};

export { useMedia, useAuthentication, useUser, useFile };
