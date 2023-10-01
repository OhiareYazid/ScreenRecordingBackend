const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();

// Enable All CORS Requests
app.use(cors());

// Multer Configuration for File Upload
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 }, // Set a file size limit if necessary
}).single('video');

// Endpoint for Uploading Video
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      // Handle Upload Error
      return res.status(500).json({ error: err.message });
    }
    // File Uploaded Successfully
    res.json({ message: 'File uploaded successfully' });
  });
});

// Serve Video Playback Page
app.get('/video/:filename', (req, res) => {
  const filename = req.params.filename;
  res.sendFile(path.join(__dirname, `uploads/${filename}`));
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
