import React, { useEffect, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import taskService from './taskService';

export default function ViewTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    taskService.getTaskById(id)
      .then(response => {
        setTask(response.data);
      })
      .catch(error => {
        console.error("Error fetching task:", error);
      });
  }, [id]);

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

  const detailStyle = {
    backgroundColor: '#f4f4f4',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    color: '#333',
  };

  const buttonStyle = {
    backgroundColor: 'white',
    color: headerColor,
    border: '1px solid white',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#ffcc00',
    color: 'black',
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
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>View Task</h1>
        <button
          style={buttonStyle}
          onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={() => navigate('/')}
        >
          Tasklist
        </button>
      </div>

      {/* Task Details */}
      <div style={containerStyle}>
        {!task ? (
          <div>Loading task...</div>
        ) : (
          <div style={detailStyle}>
            <p><strong>Title:</strong> {task.title}</p>
            <p><strong>Description:</strong> {task.description}</p>
          </div>
        )}
      </div>
    </div>
  );
} 