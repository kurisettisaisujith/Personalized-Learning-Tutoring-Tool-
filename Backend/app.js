const express = require('express');
const fs = require('fs');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const shortid = require('shortid');
const jwt = require('jsonwebtoken');
const User1 = require('./model/User');
const app = express();
const port = process.env.PORT || 3000;

// Load environment variables from a .env file
dotenv.config();

// Create a directory to store uploaded videos if it doesn't exist
const uploadDirectory = 'videos'; // Rename the directory to "videos"
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/studentsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

const storage = multer.diskStorage({
  destination: uploadDirectory, // Set the destination folder to "videos"
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());

// Import the Video model
const Video = require('./model/videoModel'); // Adjust the path accordingly

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  averageVideoRating: {
    type: Number,
    default: 0,
  }, // Add OTP field to the user schema
});

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const User = mongoose.model('User_data', userSchema);

// Function to generate a random OTP
function generateOTP() {
  const length = 6; // Change the length of the OTP as needed
  const charset = '0123456789'; // Define the character set for the OTP (numeric in this case)
  let otp = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    otp += charset[randomIndex];
  }

  return otp;
}

// Student Registration
app.post('/student/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingStudent = await User.findOne({ email, role: 'student' });

    if (existingStudent) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const student = new User({ name, email, password, role: 'student' });
    await student.save();

    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Student Login
app.post('/student/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await User.findOne({ email, password, role: 'student' });

    if (!student) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ email, name: student.name, role: 'student' }, 'your-secret-key', {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Faculty Registration
app.post('/faculty/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingFaculty = await User.findOne({ email, role: 'faculty' });

    if (existingFaculty) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const faculty = new User({ name: username, email, password, role: 'faculty' });
    await faculty.save();

    res.status(201).json({ message: 'Faculty registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Faculty Login
app.post('/faculty/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const faculty = await User.findOne({ email, password, role: 'faculty' });

    if (!faculty) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ email, name: faculty.name, role: 'faculty', rating: faculty. averageVideoRating, }, 'your-secret-key', {
      expiresIn: '1h',
    });
  //  console.log(token)

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to send OTP
app.post('/api/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP(); // Generate a random OTP

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP is: ${otp}`,
    });

    // Store the OTP in the database (MongoDB)
    const user = await User1.findOneAndUpdate(
      { email },
      { otp },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to verify OTP
app.post('/api/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Retrieve user from the database
    const user = await User1.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the received OTP with the stored OTP
    if (otp === user.otp) {
      res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ error: 'Invalid OTP' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ... Rest of the server code

const videoFileMap = {
  'cdn': 'videos/sir1.mp4',
  'cdn1': 'videos/sir1.mp4',
};

app.get('/videos/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = videoFileMap[fileName];
  if (!filePath) {
    return res.status(404).send('File not found');
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunksize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

// Import necessary modules and set up your server as before

// Create a route to fetch the list of available videos
app.get('/video-list', async (req, res) => {
  try {
    // Query your MongoDB database for video information
    const videos = await Video.find({}, 'videoId name path description tags averageRating ratings'); // Adjust fields as needed

    // Respond with the list of videos as a JSON array
    res.json(videos);
  } catch (error) {
    console.error('Error fetching video list:', error);
    res.status(500).json({ message: 'Error fetching video list' });
  }
});

app.get('/video-list', async (req, res) => {
  try {
    // Query your MongoDB database for video information
    const videos = await Video.find({}, 'name description rated tags'); // Adjust fields as needed

    // Respond with the list of videos as a JSON array
    res.json(videos);
  } catch (error) {
    console.error('Error fetching video list:', error);
    res.status(500).json({ message: 'Error fetching video list' });
  }
});

// The rest of your server setup and routes

// Start your server as before


app.get('/videos1/:filename', async (req, res) => {
  try {
    const fileName = req.params.filename;

    // Find the video in the MongoDB database based on the filename
    const video = await Video.findOne({ name: fileName });

    if (!video) {
      return res.status(404).send('Video not found');
    }

    const filePath = video.path;
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunksize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  } catch (error) {
    res.status(500).send('Error retrieving video');
  }
});


app.get('/search', async (req, res) => {
  const { query } = req.query;

  try {
    let videos;

    if (query) {
      // Use an exact match query for the name (case-insensitive)
      videos = await Video.find({ name: query }, 'i');
    } else {
      // If the query is empty, fetch all videos
      videos = await Video.find();
    }

    // Respond with the list of matching videos
    res.json(videos);
  } catch (error) {
    console.error('Error searching for videos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/submit-video-rating', async (req, res) => {
  try {
    // Extract data from the request body
    const { videoId, studentId, rating, facultyEmail } = req.body;

    // Validate the data
    if (!videoId) {
      return res.status(400).json({ message: 'Invalid data in the request' });
    }

    // Find the video by videoId
    const video = await Video.findOne({ videoId });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Check if the student has already rated this video
    const hasRated = video.ratings.some((ratingObj) => ratingObj.studentId === studentId);

    if (hasRated) {
      return res.status(400).json({ message: 'You have already rated this video' });
    }

    // Add the new rating
    video.ratings.push({
      studentId,
      facultyEmail,
      rating,
      timestamp: new Date(),
    });

    // Recalculate the average rating based on all ratings
    video.calculateAverageRating(); // Call the method to calculate average rating

    // Save the updated video document back to the database
    await video.save();

    // Find the faculty by facultyEmail
    const faculty = await User.findOne({ email: facultyEmail });
    console.log(faculty);

    if (faculty) {
      // Calculate the updated average rating for the faculty based on all the videos they are associated with
      const videosForFaculty = await Video.find({ facultyEmail });
      let totalRating = 0;
      let totalRatingsCount = 0;

      videosForFaculty.forEach((video) => {
        totalRating += video.averageRating;
        totalRatingsCount += video.ratings.length;
      });
      console.log("hello");

      const updatedAverageRating = totalRatingsCount > 0 ? totalRating / totalRatingsCount : 0;
      
      // Update the faculty's average rating
      faculty.averageVideoRating = updatedAverageRating;
      await faculty.save();
    }

    // Send a success response
    res.status(200).json({ message: 'Rating submitted successfully' });
  } catch (error) {
    console.error('Error submitting rating:', error);
    res.status(500).json({ message: 'Error submitting rating', error });
  }
});

app.get('/video-titles', async (req, res) => {
  try {
    const titles = await Video.distinct('name'); // Assuming 'name' is the field containing video titles
    res.json(titles);
  } catch (error) {
    console.error('Error fetching video titles:', error);
    res.status(500).json({ message: 'Error fetching video titles' });
  }
});
app.get('/videos-by-title/:title', async (req, res) => {
  try {
    const title = req.params.title;

    // Fetch videos with the specified title
    const videos = await Video.find({ name: title }); // Assuming 'name' is the field containing video titles

    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos by title:', error);
    res.status(500).json({ message: 'Error fetching videos by title' });
  }
});
// Create a route to get all faculty sorted by average rating in descending order
app.get('/faculty-list', async (req, res) => {
  try {
    const facultyList = await User.find({ role: 'faculty' }); // Assuming 'role' is used to distinguish faculty
    const sortedFacultyList = facultyList.sort((a, b) => b.averageRating - a.averageRating); // Sort by average rating, descending order
    res.status(200).json(sortedFacultyList);
  } catch (error) {
    console.error('Error fetching faculty list:', error);
    res.status(500).json({ message: 'Error fetching faculty list', error });
  }
});
app.get('/faculty/videos/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const relatedVideos = await Video.find({ facultyEmail: email }, 'videoId name path description tags averageRating ratings'); 
   
    res.json(relatedVideos);
  } catch (error) {
    console.error('Error fetching related videos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// ... Rest of your server code

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
