
import React, { useState } from 'react';

const SupportAgent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/support-agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        
      } else {
        const data = await response.json();
        console.error(data.message);
        
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      
    }
  };

  return (
    <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
      <label className="block mb-2" htmlFor="name">
        Name:
        <input
          className="w-full border p-2"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>

      <label className="block mb-2" htmlFor="email">
        Email:
        <input
          className="w-full border p-2"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>

      <label className="block mb-2" htmlFor="phone">
        Phone:
        <input
          className="w-full border p-2"
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </label>

      <label className="block mb-2" htmlFor="description">
        Description:
        <textarea
          className="w-full border p-2"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>

      <button
        className="bg-black ml text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Create Support Agent
      </button>
    </form>
  );
};
export default SupportAgent;
