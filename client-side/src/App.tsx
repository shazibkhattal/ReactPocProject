import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import  MainScreen  from "./Pages/HomePage/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
         <Route  path='/' element={<MainScreen/>} />
      </Routes>
    </div>
  );
}

export default App;
