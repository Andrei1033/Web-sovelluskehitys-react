const SingleView = ({item, setSelectedItem}) =>{
    if (!item) return null;

    return(
        <dialog open>
            <h2>{item.title}</h2>

            <p>{item.description}</p>

            {item.media_type.startsWith("image") ? (
                <img src={item.filename} width={500}/>
            ) : (
                <video src={item.filename} type={item.media_type}></video>
            )}

            <br />

            <button onClick={() => setSelectedItem(null)}>Close</button>
        </dialog>
    );
};

export default SingleView