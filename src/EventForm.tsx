import React, { useState } from 'react';
import axios from 'axios';
import type { EventType } from './types';
import { toast } from 'react-toastify';


export type EventInput = Omit<EventType, 'id' | 'archived' | 'category'>;

interface EventFormProps {
  onAddEvent: (event: EventType) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onAddEvent }) => {
  const [form, setForm] = useState<EventInput>({
    title: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post<EventType>('http://localhost:5000/events', form);
      onAddEvent(res.data);
      toast.success('Event added successfully')
      setForm({ title: '', date: '', time: '', notes: '' });
    } catch (err) {
      toast.error('Failed to add event');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-6 bg-white rounded-xl shadow-xl border border-primary mt-10">
     
      <input
        type="text"
        name="title"
        placeholder="Event Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="time"
        name="time"
        value={form.time}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full bg-primary text-white py-2 rounded hover:bg-blue-600">
        Add Event
      </button>
    </form>
  );
};

export default EventForm;
