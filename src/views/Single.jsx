import { useLocation, useNavigate} from "react-router";

const Single = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const item = state?.item;

    if (!item){
        return <h2>No media selected</h2>;
    }

    return(
        <div>
            <button onClick={() => navigate(-1)}>Go back</button>

            <h2>{item.title}</h2>

            <img src={item.filename} alt={item.title} width="400"/>

            <p>{item.description}</p>
            <p>{item.media_type}</p>
            <p>{item.filesize}</p>
        </div>
    )
};

export default Single