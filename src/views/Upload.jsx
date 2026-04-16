import { useState } from "react";
import { useNavigate } from "react-router";
import { useFile, useMedia } from "../hooks/apiHooks";
import { useUserContext } from "../hooks/contextHooks";
import useForm from "../hooks/formHooks";

const initialInputs = {
  title: "",
  description: "",
};

const Upload = () => {
  const { user } = useUserContext();
  const { postFile } = useFile();
  const { postMedia } = useMedia();
  const { inputs, handleInputChange } = useForm(initialInputs);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // File Select
  const handleFileChange = (evt) => {
    if (evt.target.files) {
      setFile(evt.target.files[0]);
    }
  };

  // SUBMIT
  const handleSubmit = (evt) => {
    evt.preventDefault();
    doUpload();
  };

  const doUpload = async () => {
    try {
      // 1 upload file
      const fileResult = await postFile(file, user.token);

      // 2 create media
      await postMedia(fileResult, inputs, user.token);

      // 3 redirect home
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <h1 className="upload-title">Upload</h1>

      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="upload-row">
          <label>Title</label>
          <input
            className="upload-input"
            name="title"
            type="text"
            onChange={handleInputChange}
          />
        </div>

        <div className="upload-row">
          <label>Description</label>
          <textarea
            className="upload-input"
            name="description"
            rows={5}
            onChange={handleInputChange}
          />
        </div>

        <div className="upload-row">
          <label>File</label>
          <input
            className="upload-file"
            type="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>

        <img
          className="upload-preview"
          src={
            file
              ? URL.createObjectURL(file)
              : "https://placehold.co/200?text=Choose+image"
          }
        />

        <button
          className="btn btn-primary upload-button"
          type="submit"
          disabled={!file || inputs.title.length < 3}
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;
