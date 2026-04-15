import { useState, useEffect} from "react";
import fetchData from '../utils/fetchData';

// TODO: add necessary imports
const useMedia = () => {
    const [mediaArray, setMediaArray] = useState([]);

    useEffect(() => {
    const getMedia = async () => {
        try {
            const mediaItems = await fetchData(
            import.meta.env.VITE_MEDIA_API + "/media"
            );

            const mediaWithUsers = await Promise.all(
            mediaItems.map(async (item) => {
                try {
                const user = await fetchData(
                    import.meta.env.VITE_AUTH_API +
                    "/users/" +
                    item.user_id
                );

                return {
                    ...item,
                    username: user.username,
                };
                } 
                catch {
                return {
                    ...item,
                    username: "unknown",
                };
                }
            })
            );
            setMediaArray(mediaWithUsers);
        } 
        catch (error) {
            console.error("fetchData error:", error);
        }
    };

    getMedia();
    }, []);
    
    return {mediaArray};
};

export {useMedia};