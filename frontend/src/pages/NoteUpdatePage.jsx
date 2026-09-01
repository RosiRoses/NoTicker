import { Loader2Icon, ArrowLeftIcon, Trash2Icon, FaceGrinningIcon } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import api from "../lib/axios";
import BackButton from '../components/BackButton';
import EmojiPicker from 'emoji-picker-react';

const NoteUpdatePage = () => {
  const [note, setNote] = useState(null);
  const [originalNote, setOriginalNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const activeFieldRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const titleCursorRef = useRef(0);
  const contentCursorRef = useRef(0);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async() => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        setOriginalNote(res.data);
        
      } catch (error) {
        console.log("Error in fetching notes", error);
        toast.error("Failed to fetch the note");
        
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      contentRef.current?.focus();

      const length = contentRef.current?.value.length ?? 0;

      contentRef.current?.setSelectionRange(length, length);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    const emoji = emojiObject.emoji;

    if (activeFieldRef.current === "title") {
      const cursor = titleCursorRef.current;

      const newTitle =
        note.title.slice(0, cursor) +
        emoji +
        note.title.slice(cursor);

      setNote({
        ...note,
        title: newTitle,
        });

      titleCursorRef.current = cursor + emoji.length;
    }

    if (activeFieldRef.current === "content") {
      const cursor = contentCursorRef.current;

      const newContent =
        note.content.slice(0, cursor) +
        emoji +
        note.content.slice(cursor);

      setNote({
        ...note,
        content: newContent,
      });

    contentCursorRef.current = cursor + emoji.length;
    }
  };


  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    const hasChanges = 
      note.title !== originalNote.title || 
      note.content !== originalNote.content;

    if(!hasChanges) {
      toast("No changes were made");
      navigate("/");
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
            <BackButton/>
            <button onClick={handleDelete} className="btn btn-error btn-outline font-mono tracking-tighter">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className='bg-[#FFD9E5] border border-base-content/10 rounded-2xl p-5 shadow-md'>
          <h2 className='font-mono text-gray-800 text-2xl mb-4' >Update Note</h2>
          <div className='flex flex-col'>
            <label className='font-mono text-gray-700' htmlFor='title'>Title</label>
            <input 
              ref = {titleRef}
              type="text" 
              id='title'
              className='mt-1 mb-3 border border-base-content/30 rounded-2xl bg-base-100 w-full p-3 placeholder:text-base-content/50' 
              placeholder='Note Title'
              value={note.title}
              onChange={(e) => {
                setNote({ ...note, title: e.target.value });
                titleCursorRef.current = e.target.selectionStart;
              }}
              onSelect={(e) => {
                activeFieldRef.current = "title";
                titleCursorRef.current = e.target.selectionStart;
              }}
              onMouseDown={() => {
                activeFieldRef.current = "title";
              }}
              onMouseUp={(e) => {
                activeFieldRef.current = "title";
                titleCursorRef.current = e.target.selectionStart;
              }}
              onKeyDown={handleKeyDown}
              
              />

            <label className='font-mono text-gray-700' htmlFor='content'>Content</label>
            <textarea
              ref={contentRef}
              id="content"
              className="mt-1 mb-2 border border-base-content/30 rounded-2xl bg-base-100 w-full h-36 p-3 placeholder:text-base-content/50"
              placeholder="Write your note here..."
              value={note.content}
              onChange={(e) => {
                setNote({ ...note, content: e.target.value });
                contentCursorRef.current = e.target.selectionStart;
              }}
              onMouseDown={() => {
                activeFieldRef.current = "content";
              }}
              onMouseUp={(e) => {
                activeFieldRef.current = "content";
                contentCursorRef.current = e.target.selectionStart;
              }}
              onSelect={(e) => {
                activeFieldRef.current = "content";
                contentCursorRef.current = e.target.selectionStart;
              }}
              onKeyDown={(e) => {
                if (e.ctrlKey && e.key === "Enter") {
                  e.preventDefault();
                  handleSave();
                }
              }}
            />

            <div ref={emojiPickerRef} className="relative">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                onMouseDown={(e) => e.preventDefault()}
              >
                <FaceGrinningIcon className="ml-1 size-5 text-gray-700" />
              </button>

              {showEmojiPicker && (
                <div className="absolute z-50 mt-2">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>
            

            <p className='text-gray-600 mb-3'>Tip: Press ctrl + Enter to save changes</p>

            <button
              onClick={handleSave} 
              className='btn bg-[#E696AF] border-none translate-all duration-300 hover:bg-[#C44569] hover:border-none hover:text-white ml-auto '
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