import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
    try{
        const notes = await Note.find().sort({
            isPinned: -1,
            pinnedAt: -1,
            createdAt:-1,
        });    //newest first

        res.status(200).json(notes)
    } catch(error){
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function getNoteById(req,res){
    try{
        const notes = await Note.findById(req.params.id);
        if (!notes) return res.status(400).json({message: "Note not found"});
        res.status(200).json(notes);

    } catch(error) {
        console.error("Error in getNoteById controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function createNote(req,res) {
    try {
        const {title, content} = req.body;
        const note = new Note({title:title, content:content});

        const savedNote = await note.save();
        res.status(201).json({message: "Note created successfully", savedNote});

    } catch(error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function updateNote(req,res) {
    try {
        const { id } = req.params;

        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({message: "Note not found"});
        }

        const {title,content} = req.body;

        const hasChanges = note.title !== title || note.content !== content;

        if(!hasChanges) {
            return res.status(200).json(note);
        }

        note.title = title;
        note.content = content;

        await note.save();

        res.status(200).json(note);
        
    } catch(error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function deleteNote(req,res) {
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if(!deletedNote) return res.status(404).json({message:"Note not found"});

        res.status(200).json({message:"Note deleted successfully"});

    } catch(error){
        console.error("Error in deleteNote controller", error);
        res.status(500).json({message:"Internal server error"});
    }

}

export async function togglePinNote(req,res) {
    try{
        const {id} = req.params;

        const note = await Note.findById(id);

        if(!note) {
            return res.status(404).json({
                message: "Note not found",
            });
        }

        if(note.isPinned) {
            // Unpin the note
            note.isPinned = false;
            note.pinnedAt = null;
        } else {
            // Pin the note
            note.isPinned = true;
            note.pinnedAt = new Date();
        }

        await note.save({ timestamps: false});

        res.status(200).json(note);

    } catch (error) {
        console.error("Error toggling pin:", error);

        res.status(500).json({ message:"Failed to pin/unpin note", });
    }

}




