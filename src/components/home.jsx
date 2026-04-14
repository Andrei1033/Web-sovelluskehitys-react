import MediaRow from "./MediaRow";
import { useState, useEffect} from "react";
import fetchData from '../utils/fetchData';

const Home = () => {
    const [mediaArray, setMediaArray] = useState([]);
    const [search, setSearch] = useState('');
    const [count, setCount] = useState(0);

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
    

    const filteredMedia = mediaArray.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <h1>My app</h1>
            <h2>My Media</h2>

            <input type="text" placeholder="Search media..." value={search} onChange={(e) => setSearch(e.target.value)}></input>

            <p>Clicks: {count}</p>

            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>

            <table>
                <thead>
                <tr>
                    <th>Thumbnail</th>
                    <th>User</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th></th>
                    <th>Created</th>
                    <th>Size</th>
                    <th>Type</th>
                </tr>
                </thead>

                <tbody>
                {filteredMedia.map((item) => (
                    <MediaRow key={item.media_id} item={item}/>
                ))}
                </tbody>
            </table>

        </>
    );
};

export default Home;