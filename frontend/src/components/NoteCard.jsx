import {React, useState} from 'react'
import { Link, useNavigate } from 'react-router'
import { PenSquareIcon, PinIcon, Trash2Icon } from "lucide-react"
import { formatDate } from '../lib/utils'
import api from "../lib/axios";
import toast from "react-hot-toast"

const NoteCard = ({note, setNotes, onPin}) => {
  const navigate = useNavigate();
  
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [noteToDelete, setNoteToDelete] = useState(null);

  const handleDeleteClick = (e, note) => { 
    e.preventDefault(); 
    e.stopPropagation(); 
    setNoteToDelete(note); 
    setShowDeleteModal(true); 
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${noteToDelete._id}`);
      setNotes((prev) => prev.filter((note) => note._id !== noteToDelete._id));
      toast.success("Note deleted successfully");

      setShowDeleteModal(false); 
      setNoteToDelete(null);
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/note/update/${note._id}`);
  }

  

  return (
    <>
      <Link to={`/note/${note._id}`}
        className="card 
                  bg-base-100  
                  transition-all 
                  duration-200 
                  border-t-4 
                  border-solid 
                border-[#FFD9E5] 
                  mb-0
                hover:border-[#E696AF]
                  hover:shadow-lg
                  hover:-translate-y-1
                  active:border-[#E696AF]
                  "> 
    


        <div className="flex flex-col gap-2 flex-grow flex-shrink p-8">
        
          <h3 className="card-title text-base-content text-lg lg:text-xl">{note.title}</h3>
          <p className="text-base-content/70 line-clamp-3 mb-6">{note.content}</p>

          <div className='flex justify-between items-center'>
            {new Date(note.updatedAt).getTime() !==
              new Date(note.createdAt).getTime()
                ? (<div>
                    <div className="text-sm text-base-content/60 mb-1">
                      Created: {formatDate(new Date(note.createdAt))}
                    </div>
                    <div className="text-sm text-base-content/60 mb-1">
                      Modified: {formatDate(new Date(note.updatedAt))}
                    </div>
                    <div className="badge bg-[#E696AF] border-none text-xs text-gray-800 mb-1">
                      Modified
                    </div>
                  </div>
                )
                : <div className="text-sm text-base-content/60  mb-1">
                    Created at: {formatDate(new Date(note.createdAt))}
                  </div>
            }
            

            <div className="flex items-center gap-1">
                <button onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onPin(note._id);
                  }}
                  className="btn btn-ghost btn-xs"
                  id='clickable'
                >
                  <PinIcon
                    className={note.isPinned ? "fill-current size-4" : "size-4"}
                  />
                </button>

                <button 
                  className="btn btn-ghost btn-xs" 
                  id='clickable'
                  onClick={(e) => handleUpdate(e, note._id)}>
                  <PenSquareIcon className="size-4" />
                </button>
                
                <button 
                  className="btn btn-ghost btn-xs text-error" 
                  id='clickable'
                  onClick={(e) => handleDeleteClick(e, note)}>
                  <Trash2Icon className="size-4" />
                </button>
            </div>
          </div>
        </div>
      </Link>

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
              <button 
                onClick={handleDelete} 
                id='clickable'
                className="btn rounded-xl border-none bg-[#E696AF] font-mono text-gray-800 hover:bg-[#C44569] hover:text-white" > 
                Delete 
              </button> 
            </div> 
          </div> 
        </div> 
      )}                
    </>
  );
};

export default NoteCard;