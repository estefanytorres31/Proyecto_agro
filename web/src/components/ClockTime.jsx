import { useState, useEffect } from "react";

const ClockTime = () => {
  const [currentDate, setCurrentDate] = useState(getDate());

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const second = today.getSeconds();
    return `${month}/${date}/${year}, ${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(getDate());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const clockStyles = {
    fontFamily: "Arial, sans-serif",
    fontSize: "1.5rem",
    color: "#333",
    backgroundColor: "#f4f4f4",
    padding: "10px 20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "inline-block",
    textAlign: "center",
    fontSize: "1.5vw",
  };

  return <p style={clockStyles}>{currentDate}</p>;
};

export default ClockTime;
