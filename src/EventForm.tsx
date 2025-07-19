import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";


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
 
  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
    if(!formData.title||!formData.time||!formData.date)
    {
      toast.error("'Please fill in all required fields(Title,time,date).'")
      return;
    }

    try{
       const response = await axios.post('http://localhost:5000/events', formData);
      const newEvent = response.data;

      toast.success('Event successfully saved! ✅');
        onSubmit(newEvent); 
          setFormData({ title: '', date: '', time: '', notes: '', category: 'Other' });



    }catch(error)
    {
       console.error('Error saving event:', error);
      toast.error('Something went wrong while saving the event ❌');

    }
  }

  return(
    <form onClick={handleSubmit}>
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
export default EventForm;