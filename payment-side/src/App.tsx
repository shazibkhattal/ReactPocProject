import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import  IFrameContent from "./component/IFrameContent"

function App() {
  return (
    <div className="App">
      <Routes>
         <Route  path='/IFrameContent' element={<IFrameContent/>} />
      </Routes>
    </div>
  );
}
export default App;
