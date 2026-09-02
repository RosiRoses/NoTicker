import React from 'react'

import { Route, Routes } from "react-router";

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";


import toast from "react-hot-toast";
import Navbar from './components/Navbar';
import NoteUpdatePage from './pages/NoteUpdatePage';

const App = () => {
  return (
    <div className="relative min-h-screen w-full bg-base-200">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/create" element={<CreatePage/>}/>
        <Route path="/note/:id" element={<NoteDetailPage/>} />
        <Route path="/note/update/:id" element={<NoteUpdatePage/>}/>
      </Routes>
    </div>
    
  )
}

export default App