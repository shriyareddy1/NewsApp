import requests
from bs4 import BeautifulSoup
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/news")
def get_news():

    url = "https://www.bbc.com"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                      "AppleWebKit/537.36 (KHTML, like Gecko) "
                      "Chrome/120.0.0.0 Safari/537.36"
    }
    response = requests.get(url,headers=headers)
    print(response.text[:500])
    soup = BeautifulSoup(response.text, "html.parser")
    headlines=[]
    for h in soup.find_all("h2"):
        a_tag = h.find_parent("a")
        if a_tag and a_tag.get("href"):
            link = "https://www.bbc.com" + a_tag["href"]
            headlines.append({"title": h.get_text(strip=True), "link": link})
    print(headlines)
    return {"headlines": headlines}