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
    return `${month}/${date}/${year} ${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(getDate());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <p>{currentDate}</p>;
};

export default ClockTime;
