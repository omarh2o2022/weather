import React, { useEffect, useState } from 'react';
import './App.css';
import Weather from './components/Weather';

function App() {
  const [timeOfDayClass, setTimeOfDayClass] = useState('day');

  useEffect(() => {
    const currentTime = new Date().getHours();

    if (currentTime >= 6 && currentTime < 12) {
      // Morning (6 AM to 11:59 AM)
      setTimeOfDayClass('morning');
    } else if (currentTime >= 12 && currentTime < 17) {
      // Afternoon (12 PM to 4:59 PM)
      setTimeOfDayClass('afternoon');
    } else if (currentTime >= 17 && currentTime < 20) {
      // Evening (5 PM to 7:59 PM)
      setTimeOfDayClass('evening');
    } else {
      // Night (8 PM to 5:59 AM)
      setTimeOfDayClass('night');
    }
  }, []);

  return (
    <div className={`App ${timeOfDayClass}`}>
      {<Weather />}
    </div>
  );
}

export default App;
