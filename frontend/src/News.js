import React, { useEffect, useState } from "react";

function News(){
      const [news, setNews] = useState([]);
      useEffect(() => {
      fetch("http://127.0.0.1:8000/api/news")
      .then((res) => res.json())
      .then((data) => setNews(data.headlines));
  }, []);

  return(
    <div>
        <h1>
            TOP HEADLINES
        </h1>
        <ul>
            {news.map((item, index) => (
          <li key={index}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          </li>
        ))}
        </ul>
    </div>
  );
} 
export default News;