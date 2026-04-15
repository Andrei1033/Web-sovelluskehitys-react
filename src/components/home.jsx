import MediaRow from "./MediaRow";
import { useState } from "react";
import { useMedia } from "../hooks/apiHooks";

const Home = () => {
  const { mediaArray } = useMedia();
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);

  const filteredMedia = mediaArray.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="home app-root">
      <header>
        <h1 className="site-title">My app</h1>
        <h2 className="section-title">My Media</h2>
      </header>

      <div className="controls">
        <input
          className="search"
          type="text"
          placeholder="Search media..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="count-and-action">
          <p className="muted">Clicks: {count}</p>
          <button
            className="btn btn-primary"
            onClick={() => setCount(count + 1)}
          >
            Click me
          </button>
        </div>
      </div>

      <table className="media-table" aria-label="Media list">
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
            <MediaRow key={item.media_id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
