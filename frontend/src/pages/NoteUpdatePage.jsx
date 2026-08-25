import { Loader2Icon, ArrowLeftIcon, Trash2Icon, ApertureIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams, Link } from 'react-router';
import api from "../lib/axios";


const NoteUpdatePage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
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
            <button className='btn bg-[#E696AF] translate-all duration-300 hover:bg-[#C44569] hover:border-none'>
              <Link to="/" className='flex gap-2.5 items-center font-mono tracking-tighter'>
                <ArrowLeftIcon className='size-5'/>
                Back to Notes
              </Link>
            </button>
            <button onClick={handleDelete} className="btn btn-error btn-outline font-mono tracking-tighter">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className='bg-[#FFD9E5] border border-base-content/10 rounded-2xl p-5 shadow-md'>
          <h2 className='font-mono text-gray-800 text-2xl mb-4' >Update Note</h2>
          <div className='flex flex-col'>
            <label className='font-mono text-gray-700' for='title'>Title</label>
            <input 
              type="text" id='title'
              className='mt-1 mb-3 border border-base-content/30 rounded-2xl bg-base-100 w-full p-3 placeholder:text-base-content/50' placeholder='Note Title' 
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}/>

            <label className='font-mono text-gray-700' for='content'>Content</label>
            <textarea 
              id='content'
              className='mt-1 mb-3 border border-base-content/30 rounded-2xl bg-base-100 w-full h-36 p-3 placeholder:text-base-content/50' placeholder='Write your note here...'
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}/>

            <button
              onClick={handleSave} 
              className='btn bg-[#E696AF] translate-all duration-300 hover:bg-[#C44569] hover:border-none ml-auto '
              disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div> 
        </div>
      </div>
    </div>
  );
};

export default NoteUpdatePage