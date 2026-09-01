import { useRef, useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import api from '../lib/axios';
import { FaceGrinningIcon } from 'lucide-react';
import BackButton from '../components/BackButton';
import EmojiPicker from 'emoji-picker-react';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const activeFieldRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const titleCursorRef = useRef(0);
  const contentCursorRef = useRef(0);

  const navigate = useNavigate();

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

    if(activeFieldRef.current === "title") {
      const cursor = titleCursorRef.current;

      const newTitle = title.slice(0, cursor) + emoji + title.slice(cursor);

      setTitle(newTitle);

      titleCursorRef.current = cursor + emoji.length;
    }

    if(activeFieldRef.current === "content") {
      const cursor = contentCursorRef.current;

      const newContent = content.slice(0, cursor) + emoji + content.slice(cursor);

      setContent(newContent);

      contentCursorRef.current = cursor + emoji.length;

    }
  }


  return (
    <>
      <div className= 'min-h-screen mx-auto max-w-2xl px-4 py-8'>
        <div className='mb-6'>
          <BackButton/>
        </div>
        <div className='bg-[#FFD9E5] border border-base-content/10 rounded-2xl p-5 shadow-md'>
          <h2 className='font-mono text-gray-800 text-2xl mb-4' >Create New Note</h2>
          <form onSubmit={handleSubmit} className='flex flex-col'>
            <label className='font-mono text-gray-700' htmlFor='title'>Title</label>
            <input 
              ref={titleRef}
              type="text" id='title'
              className='mt-1 mb-3 border border-base-content/30 rounded-2xl bg-base-100 w-full p-3 placeholder:text-base-content/50' placeholder='Note Title' 
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
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
              id='content'
              className='mt-1 mb-2 border border-base-content/30 rounded-2xl bg-base-100 w-full h-36 p-3 placeholder:text-base-content/50' placeholder='Write your note here...'
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
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
                if(e.ctrlKey && e.key === "Enter"){
                  e.preventDefault();
                  document.getElementById("submit-button")?.click();
                }
              }}
              
            
            />

            <div ref={emojiPickerRef} className='relative'>
              <button type="button" 
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                onMouseDown={(e) => e.preventDefault()}>
                <FaceGrinningIcon className="ml-1 size-5 text-gray-700"/>
              </button>

              {showEmojiPicker && (
                <div className='absolute z-50 mt-2'>
                  <EmojiPicker onEmojiClick={handleEmojiClick}/>
                </div>
              )}
            </div>

            <p className='text-gray-600 mb-3'>Tip: Press ctrl + Enter to create note</p>

            <button
              id="submit-button"
              type='submit' 
              className='btn bg-[#E696AF] border-none translate-all duration-300 hover:bg-[#C44569] hover:border-none ml-auto hover:text-white'
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