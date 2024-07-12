const express = require('express');
const fileupload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(cors()); // Enable CORS
app.use(fileupload());

// Serve static files from the "client/public" directory
app.use(express.static(path.join(__dirname, 'client', 'public')));

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  // Check if file is an image
  if (!file.mimetype.startsWith('image/')) {
    return res.status(400).json({ msg: 'Please upload an image file.' });
  }

  file.mv(path.join(__dirname, 'client', 'public', 'uploads', file.name), err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

// Endpoint to get list of images
app.get('/images', (req, res) => {
  const imagesFolder = path.join(__dirname, 'client', 'public', 'uploads');
  fs.readdir(imagesFolder, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to scan folder' });
    }
    // Filter out non-image files if needed
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    res.json(imageFiles);
  });
});

// Fallback for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'));
});

app.listen(5000, () => console.log('Server Started on port 5000...'));
