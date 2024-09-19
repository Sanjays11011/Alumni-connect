import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Donation from './pages/Donation/Donation';
import Home from './pages/Home/Home';
import Discussion from './pages/Discussion/Discussion';
import Message from './pages/Message/Message';
import UserDetails from './pages/UserDetails/UserDetails';
import JobDetail from './pages/Home/JobDetail';
import './index.css'; 
import './App.css';
import Feedback from './pages/Feedback/Feedback';
import EventDetails from './pages/Home/EventDetails';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/donation' element={<Donation />} />
        <Route path='/discussion' element={<Discussion />} />
        <Route path='/message' element={<Message />} />

        <Route path="/user/:userId" element={<UserDetails />} />

        <Route path="/job/:id" element={<JobDetail />} />
        <Route path='/events/:id' element={<EventDetails />} />

      </Routes>
    </div>
  );
}

function AppWrapper() {
  const location = useLocation();
  const hideLayoutRoutes = ['/signup', '/'];

  return (
    <div>
      {/* Only show Layout for routes not in hideLayoutRoutes */}
      {!hideLayoutRoutes.includes(location.pathname) && <Layout />}
      <App />
    </div>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}
