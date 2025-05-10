import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import taskService from './taskService';

export default function UpdateTask() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', description: '' });

  useEffect(() => {
    taskService.getTaskById(id).then((res) => {
      const task = res.data;
      setForm({ title: task.title, description: task.description });
    }).catch((error) => {
      console.error("Error fetching task:", error);
    });
  }, [id]);

  const handleUpdate = () => {
    taskService.updateTask(id, form)
      .then(() => {
        alert('Task updated successfully');
        navigate('/'); // Navigate back to Task List (Home page)
      })
      .catch((error) => {
        console.error("Error updating task:", error);
        alert('Failed to update task');
      });
  };

  const headerColor = '#5a6ea6';

  const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: 500,
    margin: 'auto',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '30px',
  };

  const inputStyle = {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    fontSize: '1rem',
    borderRadius: 4,
    border: '1px solid #ccc'
  };

  const buttonStyle = {
    padding: '10px 16px',
    backgroundColor: headerColor,
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%',
  };

  const linkButtonStyle = {
    backgroundColor: headerColor,
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.95rem',
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          backgroundColor: headerColor,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '15px 30px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Update Task</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate('/')} style={linkButtonStyle}>Home</button>
        </div>
      </div>

      {/* Form Container */}
      <div style={containerStyle}>
        <input
          style={inputStyle}
          placeholder="Task Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          style={inputStyle}
          placeholder="Task Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button style={buttonStyle} onClick={handleUpdate}>Update Task</button>
      </div>
    </div>
  );
}
