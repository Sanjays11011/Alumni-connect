const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const User = require('./models/userModel'); // Import the user model
const jobRoutes = require('./routes/job');
const eventRoutes = require('./routes/event');
const donationRoutes = require('./routes/donation');

dotenv.config();

const app = express();
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
app.use('/api',donationRoutes);

// Search Route
app.get('/api/search', async (req, res) => {
  const searchQuery = req.query.name;
  
  try {
    // Search for users by first name, last name, company name, or domain (case-insensitive)
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

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
