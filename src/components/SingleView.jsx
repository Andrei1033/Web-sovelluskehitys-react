const SingleView = ({ item, setSelectedItem }) => {
  if (!item) return null;

  return (
    <dialog className="single-dialog" open>
      <h2>{item.title}</h2>

      <p>{item.description}</p>

      {item.media_type.startsWith("image") ? (
        <img src={item.filename} width={500} alt={item.title} />
      ) : (
        <video controls src={item.filename} type={item.media_type}></video>
      )}

      <div style={{ marginTop: 12 }}>
        <button className="btn btn-ghost" onClick={() => setSelectedItem(null)}>
          Close
        </button>
      </div>
    </dialog>
  );
};

export default SingleView;
