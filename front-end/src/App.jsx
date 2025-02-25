import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;