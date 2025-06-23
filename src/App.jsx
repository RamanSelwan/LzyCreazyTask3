import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

import LandingPage from './components/LandingPage';
import RegisterForm from './components/RegisterPage'; 
import LoginPage from './components/LoginPage';
import VideoChatPage from './components/VideoChatPage';

function App() {
  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log('✅ Connected to socket.io server:', socket.id);
    });

    socket.on('connect_error', (err) => {
      console.error('❌ Socket connection error:', err.message);
    });

    return () => {
      socket.disconnect(); // Clean up on unmount
    };
  }, []);

  return (

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/video-chat" element={<VideoChatPage />} />
      </Routes>
   
  );
}

export default App;
