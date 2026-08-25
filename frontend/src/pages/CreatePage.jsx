import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router';
import api from '../lib/axios';
import { ArrowLeft, ArrowLeftIcon } from 'lucide-react';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true)
    try{
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note created successfully!");
      navigate("/");

    } catch(error) {
      console.log("Error creating note", error);

      if (error.response.status === 429) {
        toast.error("Slow down, you've reached the rate limit.", {
          duration: 4000,
        });
      } else {
        toast.error("Failed to create note");
      }
      

    } finally {
      setLoading(false);
    }
  }

  const handleKeyDown = (e, nextElementId) => {
    if(e.key === "Enter") {
      e.preventDefault();

      document.getElementById(nextElementId)?.focus();
    }
  }

  return (
    <>
      <div className= 'min-h-screen mx-auto max-w-6xl px-4 py-8'>
        <div>
          <button className="btn bg-[#E696AF] translate-all duration-300 hover:bg-[#C44569] hover:border-none mb-6">
            <Link to="/" className='flex gap-2.5 items-center font-mono tracking-tighter bg-'>
              <ArrowLeftIcon className='size-5'/>
              Back to Notes
            </Link>
          </button>
        </div>
        <div className='bg-secondary/30 border border-base-content/10 rounded-2xl p-5 shadow-md'>
          <h2 className='font-mono text-gray-800 text-2xl mb-4' >Create New Note</h2>
          <form onSubmit={handleSubmit} className='flex flex-col'>
            <label className='font-mono text-gray-700' for='title'>Title</label>
            <input 
              type="text" id='title'
              className='mt-1 mb-3 border border-base-content/30 rounded-2xl bg-base-100 w-full p-3 placeholder:text-base-content/50' placeholder='Note Title' 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "content")}/>

            <label className='font-mono text-gray-700' for='content'>Content</label>
            <textarea 
              id='content'
              className='mt-1 mb-3 border border-base-content/30 rounded-2xl bg-base-100 w-full h-36 p-3 placeholder:text-base-content/50' placeholder='Write your note here...'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => {
                if(e.ctrlKey && e.key === "Enter"){
                  e.preventDefault();
                  document.getElementById("submit-button")?.click();
                }
              }}/>
            
            <p className='text-gray-600'>Tip: Press ctrl + Enter to create note</p>

            <button
              id="submit-button"
              type='submit' 
              className='btn bg-[#E696AF] translate-all duration-300 hover:bg-[#C44569] hover:border-none ml-auto display:inline'
              disabled={loading}>
                {loading ? "Creating..." : "Create Note"}
              
            </button>
          </form>
          
        </div> 
      </div>
    </>
  )
}

export default CreatePage