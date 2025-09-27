import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './Layout';
import Notification from './Notifications';
import { BrowserRouter, Routes, Route,Link} from "react-router-dom";
import images from './images.png';
import About from './About';

import News from "./News";
function note (){return <h1>
  Notification
</h1>}
const App = () => {
  const [newsList, setNewsList] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', publishedDate: '' });
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/news');
      setNewsList(res.data);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/news', form);
      setForm({ title: '', description: '', publishedDate: '' });
      fetchNews();
    } catch (err) {
      console.error("Error adding news:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/news/${id}`);
      fetchNews();
    } catch (err) {
      console.error("Error deleting news:", err);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      fetchNews();
      return;
    }
    try {
      const res = await axios.get(`http://localhost:8080/api/news/search?query=${encodeURIComponent(query)}`);

      setNewsList(res.data);
    } catch (err) {
      console.error("Error searching news:", err);
    }
  };

  return (
          
         
          <div style={{ padding: '20px', 
            fontFamily: 'Georgia',
            background: 'linear-gradient(135deg, #ece9e6, #ffffff)', 
            minHeight:'100vh',
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <header 
        style={{ 
          background: "linear-gradient(135deg, #ea5753, #ffb88e)", 
          padding: "20px", 
          textAlign: "center", 
          color: "white", 
          fontSize: "24px", 
          fontWeight: "bold",
          borderRadius: "0 0 15px 15px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.2)"
        }}
      >
        News Notification App
      </header>
            


            <nav 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '30px', 
                    padding: '15px 0', 
                    background: 'linear-gradient(135deg, #ea5753, #ffb88e)', 
                    borderRadius: '10px',
                    marginBottom: '20px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                  }}
            >
                <a href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>Home</a>
                <a href="/notifications" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>Notifications</a>
                <a href="/about" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>About</a>
            </nav>
            <img 
            src={images}
            alt="News Logo" 
            style={{ display: 'block', margin: '0 auto 20px', borderRadius: '10px' }}
            />
              

      {/* Add News Form */}
      
      <form 
          onSubmit={handleSubmit} 
          style={{ 
            marginBottom: '20px',
            padding: '20px',
            border: '1px solid #ccc',   // fixed
            borderRadius: '10px',
            backgroundColor: '#f9f9f9',
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
        
        <input
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
          required
        />
        <input
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
          required
        />
        <input
          type="date"
          value={form.publishedDate}
          onChange={e => setForm({ ...form, publishedDate: e.target.value })}
          required
        />
          <button 
              type="submit" 
              style={{ 
                background: 'linear-gradient(135deg, #ea5753, #ffb88e)', 
                color: 'white', 
                border: 'none', 
                padding: '12px 20px', 
                borderRadius: '25px', 
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
              }}
              >
              ➕ Add News
              </button>

      </form>

      {/* Search */}
      <div 
  style={{ 
    marginBottom: '20px', 
    display: 'flex', 
    justifyContent: 'center'  // centers horizontally
  }}
        >
  <input
    value={query}
    onChange={e => setQuery(e.target.value)}
    placeholder="Search by title"
    style={{
      padding: '12px 15px',
      width: '250px',
      border: '1px solid #ccc',
      borderRadius: '25px 0 0 25px', // rounded left side
      outline: 'none',
      fontSize: '15px'
    }}
  />
  
  <button 
    onClick={handleSearch}
    style={{
      background: 'linear-gradient(135deg,  #ea5753, #ffb88e)',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '0 25px 25px 0', // rounded right side
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: 'bold',
      boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
        }}
      >
        🔍
      </button>
    </div>

    <div>
        <a href="https://in.bookmyshow.com/" style={{ //JSX format 
         textDecoration: "none",
         color: "inherit"
        }} >
        <div style={{
         padding:"20px",
         border: "1px solid #ccc", 
         borderRadius:"8px",
         cursor:"pointer"
        }}>
        Click me to go to BookMyShow
         </div>
        </a>

    </div> 

      {/* News List */}
      <ul>
        {newsList.map(news => (
          <li key={news.id}>
            <strong>{news.title}</strong> ({news.publishedDate})<br />
            {news.description}<br />
            <button onClick={() => handleDelete(news.id)}>Delete</button>
            <hr />
          </li>
        ))}
      </ul>
      <iframe 
      width="560" 
      height="315" 
      src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
      title="YouTube video player"
      allowfullscreen>
      </iframe>
      <BrowserRouter>
      <nav>
        <Link to="/note" target="_blank" rel="noopener noreferrer">
              notifications
        </Link>
        
      </nav>
      <Routes>
        <Route path="/" element={<Layout />}/>
        {/* <Route index element={<Notification/>} /> */}
          <Route path="/note" element={<note/>} />
      
      </Routes>
      
      </BrowserRouter>
      <div>
        <h1>
          NEWS CRAWLER
        </h1>
        <News/>
      </div>
      
      <footer 
        style={{ 
          background: "#333", 
          color: "white", 
          textAlign: "center", 
          padding: "15px", 
          marginTop: "auto", 
          borderRadius: "15px 15px 0 0" 
        }}
      >
        © {new Date().getFullYear()} News Notification App | Built with ❤️ in React
      </footer>
      </div>
  );
};

export default App;