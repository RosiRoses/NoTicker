import React from 'react'
import { Link, useNavigate } from 'react-router'
import { PenSquareIcon, Trash2Icon } from "lucide-react"
import { formatDate } from '../lib/utils'
import api from "../lib/axios";
import toast from "react-hot-toast"

const NoteCard = ({note, setNotes}) => {
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`note/update/${note._id}`);
  }

  return (
    <Link to={`/note/${note._id}`}
      className="card 
                bg-base-100  
                transition-all 
                duration-200 
                border-t-4 
                border-solid 
              border-[#FFD9E5] 
                mb-3
              hover:border-[#C44569]
                hover:shadow-lg
                hover:translate-y-2"> 
  
      <div className="card-body">
        
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
      
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
              <button className="btn btn-ghost btn-xs" onClick={(e) => handleUpdate(e, note._id)}>
                <PenSquareIcon className="size-4" />
              </button>
              
              <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, note._id)}>
                <Trash2Icon className="size-4" />
              </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;