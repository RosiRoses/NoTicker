import  React, { useEffect, useState } from 'react'

import RateLimitUI from '../components/RateLimitUI';

import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';
import { Loader2Icon } from 'lucide-react';

const USE_MOCK_DATA = false;

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pinLoading, setPinLoading] = useState(false);

  const fetchNotes = async () => {
    try {
      if (USE_MOCK_DATA) {
        const mockNotes = [
          {
            _id: "1",
            title: "My First Note",
            content: "This is a test note.",
          },
          {
            _id: "2",
            title: "Shopping List",
            content: "Milk, eggs, bread, coffee.",
          },
          {
            _id: "3",
            title: "RUI",
            content: "This is a test note.",
          },
          {
            _id: "4",
            title: "Haru",
            content: "Milk, eggs, bread, coffee.",
          },

        ];

        setNotes(mockNotes);
        setIsRateLimited(false);
        return;
      }

      const res = await api.get("/notes");
      setNotes(res.data);
      setIsRateLimited(false);

    } catch (error) {
      console.log("Error fetching notes", error);

      if (error.response?.status === 429) {
        setIsRateLimited(true);
      } else {
        toast.error("Failed to load notes");
      }

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handlePin = async (id) => {
    setPinLoading(true);

    try{
      await api.patch(`/notes/${id}/pin`);
      await fetchNotes();
    } catch (error) {
      console.log("Error pinning note:", error);
      toast.error("Failed to pin note");
    } finally {
      setPinLoading(false);
    }
  };

  const pinnedNotes = notes.filter((note) => note.isPinned);
  const unpinnedNotes = notes.filter((note) => !note.isPinned);


  return (
    <div className='min-h-screen'>
      {pinLoading && (
        <div className='flex justify-center py-3'>
          <Loader2Icon className='size-6 animate-spin text-[#C44569]'/>
        </div>
      )}

      {isRateLimited && <RateLimitUI/>}

      <div className='max-w-7xl mx-auto p-4 mt-2'>
         {loading && (
          <div className='text-center text-[#C44569] py-10'>
            Loading notes...
          </div>
        )}

        {!loading && notes.length === 0 && !isRateLimited && (
          <NotesNotFound/>
        )}

        {!loading && notes.length > 0 && !isRateLimited && (
          <div>
            {/* Pinned notes */}
            {pinnedNotes.length > 0 && (
              <>
              <section className='mb-4'>
                <h2 className='font-mono text-lg font-semibold mb-4 text-[#C44569]'>
                  Pinned Notes
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {pinnedNotes.map((note) => (
                    <NoteCard key={note._id}
                      note={note}
                      setNotes={setNotes}
                      onPin={handlePin}/>
                  ))}

                </div>
                
              </section>
              <hr className='bg-[#E696AF] h-0.5 mb-5'></hr>
              </>
              
            )}

            

            {/* Unpinned Notes */}
            {unpinnedNotes.length > 0 && (
              <section>
                {pinnedNotes.length > 0 && (
                  <h2 className='font-mono text-lg font-semibold mb-4 text-base-content/70'>
                    Other Notes
                  </h2>
                  
                )}
                

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {unpinnedNotes.map((note) => (
                    <NoteCard key={note._id}
                      note={note}
                      setNotes={setNotes}
                      onPin={handlePin}/>
                  ))}

                </div>
              </section>
            )}



          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;