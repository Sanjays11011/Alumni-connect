const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const User = require('./models/userModel'); // Import the user model
const jobRoutes = require('./routes/job');
const eventRoutes = require('./routes/event');

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST','PUT','DELETE'] ,// Allow requests from this origin (frontend URL)
  credentials: true // If you want to allow cookies to be sent, set this to true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', jobRoutes);
app.use('/api', eventRoutes);

// Search route
app.get('/api/search', async (req, res) => {
  const searchQuery = req.query.name;
  
  try {
    // Find users whose first name or last name matches the search query (case-insensitive)
    const users = await User.find({
      $or: [
        { firstname: { $regex: searchQuery, $options: 'i' } },
        { lastname: { $regex: searchQuery, $options: 'i' } }
      ]
    });

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
