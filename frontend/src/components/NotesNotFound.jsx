import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-[#FFD9E5] rounded-full p-8">
        <NotebookIcon className="size-10 text-[#C44569]" />
      </div>
      <h3 className="text-2xl font-bold">No notes yet</h3>
      <p className="text-base-content/70">
        Ready to organize your thoughts? Create your first note to get started on your journey.
      </p>
      <Link to={"/create"} className='
        btn 
        bg-[#E696AF] 
        border-none 
        transition-all 
        duration-300 
        flex
        items-center
        font-mono
        hover:bg-[#C44569]
        hover:border-none
        group
        '>
        
        <h3 className='font-mono text-base text-gray-800 group-hover:text-white'>Create Your First Note</h3>
      </Link>

    </div>
  );
};
export default NotesNotFound;