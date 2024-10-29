const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const jobRoutes = require('./routes/job');
const eventRoutes = require('./routes/event');
const donationRoutes = require('./routes/donation');
const messageRoutes = require('./routes/message'); // Add this line
const contactRoutes = require('./routes/contact');
const http = require('http'); // Import http to create a server
const { Server } = require('socket.io'); // Import socket.io

dotenv.config();

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, 
  {cors: {
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST'],        // Allow specific methods
  credentials: true                // Enable credentials if necessary
}}); // Create a new instance of Socket.IO with the HTTP server

app.use(express.json());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow credentials such as cookies
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', jobRoutes);
app.use('/api', eventRoutes);
app.use('/api', donationRoutes);
app.use('/api', messageRoutes); // Add this line
app.use('/api',contactRoutes);

// Search Route
app.get('/api/search', async (req, res) => {
  const searchQuery = req.query.name;

  try {
    const users = await User.find({
      $or: [
        { firstname: { $regex: searchQuery, $options: 'i' } },
        { lastname: { $regex: searchQuery, $options: 'i' } },
        { workingcompany: { $regex: searchQuery, $options: 'i' } },
        { workingdomain: { $regex: searchQuery, $options: 'i' } }
      ]
    });

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to fetch user details by ID
app.get('/api/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle chat message event
  socket.on('chat message', (msg) => {
    console.log('Message received:', msg);
    io.emit('chat message', msg); // Broadcast the message to all connected clients
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});