import { useState, useEffect } from "react";

const ClockTime = () => {
  const [dateTime, setDateTime] = useState({
    date: '',
    time: ''
  });

  function getDateTime() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const hour = today.getHours().toString().padStart(2, "0");
    const minute = today.getMinutes().toString().padStart(2, "0");
    const second = today.getSeconds().toString().padStart(2, "0");

    return {
      date: `${date}/${month}/${year}`,
      time: `${hour}:${minute}:${second}`
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(getDateTime());
    }, 1000);

    // Inicializar inmediatamente
    setDateTime(getDateTime());

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-sans bg-gray-100 p-2 rounded-xl shadow-lg inline-flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
      <div className="text-base sm:text-xl text-gray-800">
        {dateTime.date}
      </div>
      <div className="hidden sm:block text-gray-400">•</div>
      <div className="text-lg sm:text-xl text-gray-800">
        {dateTime.time}
      </div>
    </div>
  );
};

export default ClockTime;