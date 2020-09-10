import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { storage } from "./firebase";

function App() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(
    "Choose before Pressing the Upload button"
  );
  const [file, setFile] = useState(null);

  const onFileChange = (event) => {
    // Update the state
    setFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    setLoading(true);

    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("myFile", file, file.name);

    // Details of the uploaded file
    console.log(file);
    const type = file.type.split(`/`)[0];
    const storageRef = storage.ref(type);

    storageRef
      .child(`/${file.name}`)
      .put(file)
      .then(function (snapshot) {
        setLoading(false);
        setFile(null);
        setMessage("Upload success!");
        console.log("Uploaded a blob or file!", snapshot);
      })
      .catch((err) => {
        console.log("Uploading error: ", err);
        setFile(null);
        setLoading(false);
        setMessage("Upload failed!");
      });
  };

  const fileData = () => {
    if (file) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {file.name}</p>
          <p>File Type: {file.type}</p>
          <p>Last Modified: {file.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>{message}</h4>
        </div>
      );
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <div>
          <input type='file' onChange={onFileChange} />
          {file && (
            <button className='buttonload' onClick={onFileUpload}>
              {loading ? (
                <div>
                  <i className='fa fa-circle-o-notch fa-spin'></i> Loading
                </div>
              ) : (
                "Upload!"
              )}
            </button>
          )}
        </div>
        {fileData()}
      </header>
    </div>
  );
}

export default App;
