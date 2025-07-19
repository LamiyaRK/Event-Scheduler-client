import { useState } from "react";


interface EventFormProps {
  onSubmit: (event: EventInput & { _id: string }) => void; 
}

export interface EventInput {
  title: string;
  date: string;
  time: string;
  notes?: string;
  category?: 'Work' | 'Personal' | 'Other';
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit }) =>{
     const [formData, setFormData] = useState<EventInput>({
    title: '',
    date: '',
    time: '',
    notes: '',
    category: 'Other',
  });

  const handleChange=(e:React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement|HTMLSelectElement>)=>{
    const {name,value}=e.target;
    setFormData(prev=>({
    ...prev,
    [name]:value
    }))
  }
  return(
    <form>
         <h2 className="text-xl font-semibold text-center">Create New Event</h2>
         
      <input
        type="text"
        name="title"
        placeholder="Event Title"
        className="w-full border p-2 rounded"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="date"
        className="w-full border p-2 rounded"
        value={formData.date}
        onChange={handleChange}
        required
      />

      <input
        type="time"
        name="time"
        className="w-full border p-2 rounded"
        value={formData.time}
        onChange={handleChange}
        required
      />

      <textarea
        name="notes"
        placeholder="Additional Notes (optional)"
        className="w-full border p-2 rounded"
        value={formData.notes}
        onChange={handleChange}
      ></textarea>

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Other">Other</option>
      </select>

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded hover:bg-purple-700 transition"
      >
        Add Event
      </button>
    
        
    </form>

  );

}