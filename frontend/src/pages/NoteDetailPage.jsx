import { Loader2Icon, ArrowLeftIcon, Trash2Icon, ApertureIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams, Link } from 'react-router';
import api from "../lib/axios";
import { formatDate } from '../lib/utils'
import BackButton from '../components/BackButton';


const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async() => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        
      } catch (error) {
        console.log("Error in fetching notes", error);
        toast.error("Failed to fetch the note");
        
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");

    } catch(error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };


  if (loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <Loader2Icon className='animate-spin size-10'/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <BackButton/>
            <button onClick={handleDelete} className="btn btn-error btn-outline font-mono tracking-tighter">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className='bg-[#FFD9E5] border border-base-content/10 rounded-2xl p-5 shadow-md'>
            <h2 className='font-mono text-black font-bold text-2xl mb-4' >{note.title}</h2>
            <p className='font-mono text-gray-700 mb-10'>{note.content}</p>
            <p className='font-mono text-gray-700 mb-1'>{formatDate(new Date(note.createdAt))}</p>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage
