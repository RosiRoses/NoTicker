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

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

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

  const handleDeleteClick = (e, note) => {
    e.preventDefault();
    e.stopPropagation();

    setNoteToDelete(note);
    setShowDeleteModal(true);
  }

  const handleDelete = async () => {

    try {
      await api.delete(`/notes/${noteToDelete._id}`);
      toast.success("Note deleted successfully");

      setShowDeleteModal(false); 
      setNoteToDelete(null);
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
    <>
      <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <BackButton/>
              <button onClick={(e) => handleDeleteClick(e, note)} 
                className="btn btn-error btn-outline font-mono tracking-tighter"
                id='clickable'
              >
                <Trash2Icon className="h-5 w-5" />
                Delete Note
              </button>
            </div>

            <div className='bg-[#FFD9E5] border border-base-content/10 rounded-2xl p-5 shadow-md'>
              <h2 className='font-mono text-black font-bold text-xl lg:text-2xl mb-4' >{note.title}</h2>
              <p className='font-mono text-gray-700 mb-8 text:xs lg:text-sm'>{note.content}</p>
            
              <div className="font-mono text-gray-700 text-xs lg:text-sm">
                {new Date(note.updatedAt).getTime() !==
                  new Date(note.createdAt).getTime()
                    ? (<div>
                        <div className="text-sm text-base-content/60 mb-1">
                          Created: {formatDate(new Date(note.createdAt))}
                        </div>
                        <div className="text-sm text-base-content/60 mb-1">
                          Modified: {formatDate(new Date(note.updatedAt))}
                        </div>
                        <div className="badge bg-[#E696AF] border-none text-xs text-gray-800 mt-1">
                          Modified
                        </div>
                      </div>
                    )
                    : <div className="text-sm text-base-content/60  mb-1">
                        Created at: {formatDate(new Date(note.createdAt))}
                      </div>
                }
              </div>
            </div> 
          </div>
        </div>
      </div>

      {showDeleteModal && ( 
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"> 
          <div className="w-full max-w-md rounded-2xl bg-[#FFF8F0] p-5 shadow-xl"> 
            <h2 className="font-mono text-md lg:text-xl font-bold text-gray-800"> 
              Delete Note? 
            </h2> 
            <p className="mt-2 text-gray-600 text-sm lg:text-md"> 
              Are you sure you want to delete this note? 
            </p> 
            <div className="mt-5 flex justify-end gap-3"> 
              <button onClick={() => { 
                setShowDeleteModal(false); 
                setNoteToDelete(null); 
                }} 
                className="btn rounded-xl border-none bg-gray-200 font-mono text-gray-700 hover:bg-gray-300" 
                id='clickable'
              > 
                Cancel 
              </button> 
              <button onClick={handleDelete} className="btn rounded-xl border-none bg-[#E696AF] font-mono text-gray-800 hover:bg-[#C44569] hover:text-white" id='clickable'> 
                Delete 
              </button> 
            </div> 
          </div> 
        </div> 
      )}
    </>
  );
};

export default NoteDetailPage
