import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './Layout';
import Notification from './Notifications';
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
   

    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>📰 News Notification App</h1>

      {/* Add News Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
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
        <button type="submit">Add News</button>
      </form>

      {/* Search */}
      <div style={{ marginBottom: '20px' }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by title"
        />
        <button onClick={handleSearch}>Search</button>
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
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        {/* <Route index element={<Notification/>} /> */}
          <Route path="notifications" element={<Notification/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;