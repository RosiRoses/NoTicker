import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        isPinned: {
            type: Boolean,
            default: false,
        },
        pinnedAt: {
            type: Date,
            default: null,
        },

    },
    {
        timestamps:true //mongoose stores createdAt and updatedAt
    }
);

const Note = mongoose.model("Note", noteSchema);

// model functions:
// .save() / .create() = persist data to the database
// .find() = read data stored in database

export default Note;