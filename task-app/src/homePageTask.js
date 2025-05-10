import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import taskService from './taskService';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    taskService.getAllTasks()
      .then((res) => {
        // Initialize task statuses (pending by default)
        const updatedTasks = res.data.map(task => ({
          ...task,
          status: task.status || 'pending', // Add status to task if it's not available
        }));
        setTasks(updatedTasks);
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  };

  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      taskService.deleteTask(id)
        .then(() => {
          setTasks(tasks.filter(task => task.id !== id));
        })
        .catch((error) => console.error('Error deleting task:', error));
    }
  };

  const toggleStatus = (id) => {
    // Toggle task status between 'pending' and 'completed' only in the front-end
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' } : task
    ));
  };

  const headerColor = '#5a6ea6';

  const buttonStyle = (color) => ({
    backgroundColor: color,
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    textDecoration: 'none',
  });

  const buttonContainerStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
    flexWrap: 'wrap',
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
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Fixed string
        }}
      >
        <h1 style={{ margin: 0, fontSize: '1.8rem', textAlign: 'center', flex: 1 }}>
          Task List
        </h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate('/add')} style={buttonStyle(headerColor)}>
            Add New
          </button>
        </div>
      </div>

      {/* Task Grid */}
      <div
        style={{
          padding: '30px 40px',
          fontFamily: 'Arial, sans-serif',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)', // 2 columns
          gap: '20px',
        }}
      >
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              backgroundColor: '#ffffff',
              border: `1px solid ${headerColor}`,
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)', // Fixed string
              textAlign: 'left',
              boxSizing: 'border-box',
            }}
          >
            <h3 style={{ marginBottom: '10px', color: '#333' }}>{task.title}</h3>
            <p>Status: {task.status}</p> {/* Display status */}

            <div style={buttonContainerStyle}>
              <Link to={`/task/${task.id}`} style={buttonStyle(headerColor)}>
                View Task
              </Link>
              <Link to={`/update/${task.id}`} style={buttonStyle(headerColor)}>
                Update Task
              </Link>
              <button
                onClick={() => deleteTask(task.id)}
                style={buttonStyle('#5a6ea6')}
              >
                Delete
              </button>
              {/* Mark as Read / Pending button */}
              <button
                onClick={() => toggleStatus(task.id)}
                style={buttonStyle(task.status === 'pending' ? 'orange' : 'green')}
              >
                {task.status === 'pending' ? 'Mark as Read' : 'Mark as Pending'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
