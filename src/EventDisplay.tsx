import React from 'react';
import axios from 'axios';
import type { EventInput } from './EventForm';
import { toast } from 'react-toastify';

interface EventWithId extends EventInput {
  id: string; 
  archived: boolean;
  category: 'Work' | 'Personal' | 'Other';
}

interface EventDisplayProps {
  events: EventWithId[];
  setEvents: React.Dispatch<React.SetStateAction<EventWithId[]>>;
}

const EventDisplay: React.FC<EventDisplayProps> = ({ events, setEvents }) => {
  const handleDelete = (id: string) => {
    axios
      .delete(`https://event-handler-amber.vercel.app/events/${id}`)
      .then(() =>{ setEvents((prev) => prev.filter((e) => e.id !== id))
    toast.success("Successfully deleted event")}
  )
      .catch((err) => toast.error('Delete failed:', err));
  };

  const toggleArchive = (id: string) => {
    const eventToUpdate = events.find((e) => e.id === id);
    if (!eventToUpdate) return;

    const updated = { ...eventToUpdate, archived: !eventToUpdate.archived };

    axios
      .put(`https://event-handler-amber.vercel.app/events/${id}`, updated)
      .then(() => {
        setEvents((prev) =>
          prev.map((e) => (e.id === id ? { ...e, archived: updated.archived } : e))
        );
      })
      .catch((err) => toast.error('Archive failed:', err));
  };

  return (
  <div className="p-4 max-w-4xl mx-auto mt-10">
   
    {!events.length ? (
      <h2 className="text-center text-gray-500 text-xl mt-10">
        No events have been added in this category.
      </h2>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className={`p-4 rounded-xl shadow-md border ${
              event.archived ? 'opacity-60 bg-gray-100' : 'bg-white'
            }`}
          >
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-sm text-gray-600">
              {event.date} at {event.time}
            </p>
            {event.notes && <p className="mt-2">{event.notes}</p>}
            <p className="mt-1 text-sm">
              <span className="font-semibold">Category:</span> {event.category}
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleDelete(event.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
              <button
                onClick={() => toggleArchive(event.id)}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
              >
                {event.archived ? 'Unarchive' : 'Archive'}
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
};

export default EventDisplay;
