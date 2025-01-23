import React, { useState, useEffect } from 'react';

const CountdownCapsule = ({ userId }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const fetchUnveilDate = async () => {
      try {
        const response = await fetch(`http://localhost:3300/User/allcapsule`);
        const data = await response.json();
        if (response.ok) {
          calculateTimeLeft(new Date(data.unveilDate).getTime());
          setLoading(false);
        } else {
          console.error('Error:', data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUnveilDate();
  }, [userId]);

  const calculateTimeLeft = (targetDate) => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      calculateTimeLeft(timeLeft.targetDate);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft.targetDate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="relative flex items-center justify-center">
      <img src="./images/capsule.png" alt="Capsule" />
      <div className="absolute w-[150px] h-[70px] bg-black flex items-center justify-center text-white text-xl font-bold rounded-md">
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </div>
    </div>
  );
};

export default CountdownCapsule;
