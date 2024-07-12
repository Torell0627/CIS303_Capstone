import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import '../Styles/FileUpload.css';

export const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = e => {
    const selectedFile = e.target.files[0];

    // Check if file is an image
    if (selectedFile && !selectedFile.type.startsWith('image/')) {
      setMessage('Please select an image file.');
      setFile('');
      setFilename('Choose File');
      return;
    }

    setFile(selectedFile);
    setFilename(selectedFile ? selectedFile.name : 'Choose File');
  };

  const onSubmit = async e => {
    e.preventDefault();

    // Check if a file has been selected
    if (!file) {
      setMessage('Please select a file before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
          // clear progress
          setTimeout(() => setUploadPercentage(0), 5000);
        }
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('File uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  const clearMessage = () => {
    setMessage('');
  };

  return (
    <Fragment>
      {message ? <Message msg={message} clearMessage={clearMessage} /> : null}
      <form onSubmit={onSubmit}>
        <div className="input-group mb-3">
          </div>
          <div className="custom-file">
            <input 
              type="file" 
              className="custom-file-input" 
              id="inputGroupFile01" 
              onChange={onChange} 
            />
            <label className="custom-file-label" htmlFor="inputGroupFile01">
            </label>
          </div>
        <Progress percentage={uploadPercentage} />
        <div className="button-container">
          <input type='submit' value='Upload' className='btn btn-primary btn-block mt-4'/>
        </div>
      </form>
      { uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width : '100%' }} src={uploadedFile.filePath} alt=""/>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;
