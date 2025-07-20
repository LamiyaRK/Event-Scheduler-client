import React, { useEffect, useState } from 'react';
import EventForm from './EventForm';
import EventDisplay from './EventDisplay';
import axios from 'axios';
import type { EventType } from './types';
import logo from '/logo.png';
import { toast, ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [filter, setFilter] = useState<'All' | 'Work' | 'Personal' | 'Other'>('All');

  
  const fetchEvents = () => {
    axios
      .get<EventType[]>('https://event-handler-amber.vercel.app/events')
      .then((res) => {
        const sorted = [...res.data].sort((a, b) => {
          const aDateTime = new Date(`${a.date}T${a.time}`);
          const bDateTime = new Date(`${b.date}T${b.time}`);
          return aDateTime.getTime() - bDateTime.getTime();
        });
        setEvents(sorted);
      })
      .catch((err) => toast.error('Error loading events:', err));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

 
  const handleAddEvent = () => {
    fetchEvents();
  };

  const filteredEvents = filter === 'All'
    ? events
    : events.filter((e) => e.category === filter);

  return (
    <div className="min-h-screen ">
      <div className="navbar bg-primary text-white shadow-sm flex items-center gap-4 px-6 py-3">
        <img src={logo} className="h-12" alt="Logo" />
        <p className="text-3xl font-bold">Scheduly</p>
      </div>

      <h1 className="text-5xl font-bold text-center text-primary my-8 wrap-break-word">Welcome to Scheduly</h1>
      
      <h1 className='text-center text-4xl font-bold text-primary my-8'>Add New Event</h1>
      <EventForm onAddEvent={handleAddEvent} />
 
          <h1 className='text-center text-4xl font-bold text-primary my-8'>My Events</h1>
     
      <div className="flex justify-center mb-4 my-8">
        {['All', 'Work', 'Personal', 'Other'].map((cat) => (
          <button
            key={cat}
            className={`mx-2 px-4 py-2 rounded-full transition ${
              filter === cat ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => setFilter(cat as any)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Show filtered events */}
      <EventDisplay events={filteredEvents} setEvents={setEvents} />
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default App;
