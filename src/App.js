import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import Main from './pages/MainPage';
import VideoChat from './pages/VideoChatPage';
import VideoUpload from './pages/VideoUploadPage';
import Invite from './pages/InvitePage';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Main/> } />
        <Route path="/join" element={ <VideoChat/> } />
        <Route path="/join/:roomId" element={ <Invite/> } />
        <Route path="/upload" element={ <VideoUpload/> } />
      </Routes>
    </Router>
    
  );
}