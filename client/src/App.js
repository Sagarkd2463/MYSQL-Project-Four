import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './Style.css';
import Books from './pages/Books';
import AddBook from './pages/AddBook';
import UpdateBook from './pages/UpdateBook';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Books />}/>
          <Route path='/add' element={<AddBook />}/>
          <Route path='/update/:id' element={<UpdateBook />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
