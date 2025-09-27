import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Notification() {
 return(

        <div 
  className="notifications page"
  style={{
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, rgba(137, 246, 254, 0.67), #ff66b0ff)", // blue gradient
    fontFamily: "'Times New Roman', serif",
    color: "#000000",
    textAlign: "center",
    padding: "20px"
  }}
>
  <h1 style={{ fontSize: "42px", marginBottom: "20px", textShadow: "2px 2px 6px rgba(0,0,0,0.3)" }}>
    🤖 AI Notifications
  </h1>
  <p style={{ fontSize: "18px", maxWidth: "600px", marginBottom: "30px" }}>
    Stay updated with the latest AI-driven alerts, news, and personalized notifications tailored just for you.
  </p>

  {/* Example notification card */}
  <div 
    style={{
      background: "white",
      color: "#333",
      padding: "20px",
      borderRadius: "15px",
      boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
      width: "350px",
      textAlign: "left"
    }}
  >
    <h3 style={{ marginTop: 0 }}>📢 New AI Update</h3>
    <p>AI system detected new trends in news updates. Check out the latest insights now.</p>
    <button 
      style={{
        background: "linear-gradient(135deg, #ff9966, #ff5e62)",
        color: "white",
        border: "none",
        padding: "10px 18px",
        borderRadius: "25px",
        cursor: "pointer",
        fontWeight: "bold",
        marginTop: "10px"
      }}
    >
      View Details
    </button>
  </div>
</div>

 );

}