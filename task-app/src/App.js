import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './homePageTask';
import AddTask from './AddTask';
import UpdateTask from './UpdateTask';
import ViewTask from './ViewTask';

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/add" element={<AddTask/>} />
        <Route path="/update/:id" element={<UpdateTask />} />
        <Route path="/task/:id" element={<ViewTask />} />
      </Routes>
  );
}