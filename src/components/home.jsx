import MediaRow from "./MediaRow";
import { useState } from "react";

const Home = () => {
    const mediaArray = [
        {
            media_id: 8,
            user_id: 5,
            filename: 'https://placehold.co/1200x800',
            thumbnail: 'https://placehold.co/320x240',
            filesize: 170469,
            media_type: 'image/jpeg',
            title: 'Picture 1',
            description: 'This is a placeholder picture.',
            created_at: '2024-01-07T20:49:34.000Z',
        },
        {
            media_id: 9,
            user_id: 7,
            filename: 'https://placehold.co/1200x800',
            thumbnail: 'https://placehold.co/320x240',
            media_type: 'image/jpeg',
            title: 'Pic 2',
            description: '',
            created_at: '2024-01-07T21:32:27.000Z',
        },
        {
            media_id: 17,
            user_id: 2,
            filename: 'https://placehold.co/1200x800',
            thumbnail: 'https://placehold.co/320x240',
            filesize: 1236616,
            media_type: 'video/mp4',
            title: 'Bunny',
            description: 'Butterflies fly around the bunny.',
            created_at: '2024-01-07T20:48:13.000Z',
        },
    ]

    const [search, setSearch] = useState('');
    const [count, setCount] = useState(0);
    const filteredMedia = mediaArray.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
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