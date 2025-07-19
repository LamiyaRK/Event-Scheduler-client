import React, { useEffect, useState } from 'react';
import EventForm from './EventForm';
import EventDisplay from './EventDisplay';

import axios from 'axios';

const App: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    axios
      .get<EventType[]>('http://localhost:5000/events')
      .then((res) => setEvents(res.data))
      .catch((err) => console.error('Error loading events:', err));
  }, []);

  const handleAddEvent = (event: EventType) => {
    setEvents((prev) => [event, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Mini Event Scheduler</h1>
      <EventForm onAddEvent={handleAddEvent} />
      <EventDisplay events={events} setEvents={setEvents} />
    </div>
  );
};

export default App;
