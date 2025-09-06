import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tag: [{ type: String }],//REVISAR
    urlFile: {
        type: String
    }, // si suben documento
    urlImage: {
        type: String
    }, // si suben imagen
    description: {
        type: String
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }
});

export const boardsModel = mongoose.model("boards", boardSchema);