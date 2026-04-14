import MediaRow from "./MediaRow";
import { useState, useEffect} from "react";
import fetchData from '../utils/fetchData';

const Home = () => {
    const [mediaArray, setMediaArray] = useState([]);
    const [search, setSearch] = useState('');
    const [count, setCount] = useState(0);

    useEffect(() => {
        const getMedia = async () =>{
            try{
                const json = await fetchData("test.json");
                setMediaArray(json);
            }
            catch (error){
                console.error(error);
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