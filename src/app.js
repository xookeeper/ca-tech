require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('../routes/userRoutes');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;


// Configure CORS to allow requests from specific origins
const corsOptions = {
  origin: ['https://sanjaykutheandco.com', 'https://www.sanjaykutheandco.com', process.env.CORS_ORIGIN, process.env.DNS_SERVER_URL],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

// Enable CORS for requests from the specified origin
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use('/api/users', userRoutes);

// Serve index.html as the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Serve login.html for /login route
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

// Serve register.html for /register route
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'register.html'));
});

// Serve converter.html for /converter route
app.get('/converter', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'converter.html'));
});

// Serve adminPanel.html for /adminPanel route
app.get('/adminPanel', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'adminPanel.html'));
});

// Serve config.js with environment variables
app.get('/config.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.send(`
    const config = {
      serverUrl: '${process.env.SERVER_URL}',
      firebaseConfig: {
        apiKey: '${process.env.FIREBASE_API_KEY}',
        authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
        projectId: '${process.env.FIREBASE_PROJECT_ID}',
        storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
        messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
        appId: '${process.env.FIREBASE_APP_ID}',
        measurementId: '${process.env.FIREBASE_MEASUREMENT_ID}'
      }
    };
  `);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});