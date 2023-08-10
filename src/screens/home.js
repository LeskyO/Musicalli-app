import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Feed from './feed';
import Library from './library';
import Musicplayer from './musicplayer';
import Login from './auth';
import './home.css';
import { setClientToken } from '../spotify';
import Sidebar from '../components/sidebar';

function Home() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const hash = window.location.hash;
    window.location.hash = '';
    if (!token && hash) {
      const _token = hash.split('&')[0].split('=')[1];
      window.localStorage.setItem('token', _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

  // If token is not available, render the Login component
  if (!token) {
    return <Login />;
  }

  return (
    <Router>
      <div className="main-body">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/musicplayer" element={<Musicplayer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Home;
