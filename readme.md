API Documentation
Base URL
All API endpoints are relative to: https://getvideo.onrender.com
Upload Video
Endpoint: POST /upload
Description: Upload a recorded screen video.
Request:
Method: POST
Headers: None (uses multipart/form-data for file upload)
Body:
Field Name: video
Type: File
Description: The recorded screen video file (in mp4 format).
Responses:
200 OK
Description: Video uploaded successfully.
Response Body: { "message": "File uploaded successfully" }
500 Internal Server Error
Description: An error occurred while uploading the video.
Response Body: { "error": "Error message describing the issue" }
Get Video
Endpoint: GET /video/:filename
Description: Get a specific recorded video by filename.
Request:
Method: GET
Headers: None
Params:
Path Parameter: filename
Type: String
Description: The filename of the recorded video to be retrieved.
Responses:
200 OK
Description: Video retrieved successfully.
Response Body: Video file (in mp4 format).
404 Not Found
Description: The specified video file does not exist.
Response Body: { "error": "Video not found" }
Example Usage
Uploading Video (JavaScript Fetch API)
```javascript

async function uploadVideo(videoBlob) {
  try {
    const formData = new FormData();
    formData.append('video', videoBlob, 'recorded-screen.mp4');

    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message); // Output: File uploaded successfully
    } else {
      console.error('Failed to upload video:', response.statusText);
    }
  } catch (error) {
    console.error('Error uploading video:', error);
  }
}
```
Retrieving Video (JavaScript Fetch API)
``` javascript
Copy code
async function getVideo(filename) {
  try {
    const response = await fetch(`http://localhost:3000/video/${filename}`);

    if (response.ok) {
      const videoBlob = await response.blob();
      const videoUrl = URL.createObjectURL(videoBlob);
      // Use videoUrl to display or manipulate the video
    } else if (response.status === 404) {
      console.error('Video not found');
    } else {
      console.error('Failed to retrieve video:', response.statusText);
    }
  } catch (error) {
    console.error('Error retrieving video:', error);
  }
}
```
