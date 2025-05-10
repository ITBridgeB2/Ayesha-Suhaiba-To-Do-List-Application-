import React, { useState } from 'react';
import taskService from './taskService';
import { useNavigate } from 'react-router-dom';

export default function AddTask() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '' });

  const handleSubmit = () => {
    if (!form.title.trim() || !form.description.trim()) {
      alert("Please fill in both the title and description.");
      return;
    }

    taskService.saveTaskDetails(form)
      .then(() => {
        alert("Task added successfully");
        console.log("New Task Added:", form);
        setForm({ title: '', description: '' });
        navigate('/');
      })
      .catch((error) => {
        console.error("Error adding task:", error);
        alert("Failed to add task. Please try again.");
      });
  };

  const headerColor = '#5a6ea6';

  const pageStyle = {
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    backgroundColor: '#f2f2f2'
  };

  const headerStyle = {
    backgroundColor: headerColor,
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  const formBoxStyle = {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: 500,
    margin: '40px auto'
  };

  const inputStyle = {
    width: '100%',
    marginBottom: 15,
    padding: 10,
    fontSize: '1rem',
    borderRadius: 4,
    border: '1px solid #ccc'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: headerColor,
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer'
  };

  return (
    <div style={pageStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Add Task</h1>
        <button
          style={{
            backgroundColor: '#fff',
            color: 'black',
            padding: '8px 16px',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        >
          Home
        </button>
      </div>

      {/* Form Box */}
      <div style={formBoxStyle}>
        <input
          style={inputStyle}
          placeholder="Task Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          style={inputStyle}
          placeholder="Task Description"
          rows="5"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button style={buttonStyle} onClick={handleSubmit}>Add Task</button>
      </div>
    </div>
  );
}
