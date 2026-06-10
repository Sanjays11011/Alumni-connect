const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const jobRoutes = require('./routes/job');
const eventRoutes = require('./routes/event');
const donationRoutes = require('./routes/donation');
const messageRoutes = require('./routes/message'); 
const contactRoutes = require('./routes/contact');
const http = require('http'); 
const { Server } = require('socket.io'); 
const path = require('path');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const server = http.createServer(app); 
const io = new Server(server, 
  {cors: {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],        
  credentials: true               
}}); 

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(bodyParser.json());
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', jobRoutes);
app.use('/api', eventRoutes);
app.use('/api', donationRoutes);
app.use('/api', messageRoutes); 
app.use('/api',contactRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('chat message', (msg) => {
    console.log('Message received:', msg);
    io.emit('chat message', msg); 
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});