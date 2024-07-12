import React from 'react';
import FileUpload from './Components/FileUpload'; 
import './App.css';

const App = () => (
  <div className='container mt-4'>
    <h3 className='display-4 text-center mb-4'>
      <img className="Me" src='TorellButler.JPG' alt='Torell' width='20%' height='20%' />
      Rell's React Image Uploader
    </h3>

    <FileUpload />
    <a className="link" href="http://localhost:5000/Carousel.html" target="_blank" rel="noopener noreferrer">View Carousel</a>
  </div>
);

export default App;
 