import { useLocation, useNavigate } from "react-router";

const Single = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const item = state?.item;

  if (!item) {
    return <h2>No media selected</h2>;
  }

  return (
    <div className="single-page">
      <button className="btn btn-ghost" onClick={() => navigate(-1)}>
        Go back
      </button>

      <h2>{item.title}</h2>

      <img
        className="thumb main_view_img"
        src={item.filename}
        alt={item.title}
        width="400"
      />

      <p className="muted">Owner: {item.username}</p>
      <p>{item.description}</p>
      <p className="muted">
        {item.media_type} · {item.filesize}
      </p>
    </div>
  );
};

export default Single;
