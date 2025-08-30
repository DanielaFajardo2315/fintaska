import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["factura", "recibo", "contrato", "nota", "otro"],
        default: "otro"
    }, //REVISAR
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

export const boardModel = mongoose.model("boards", boardSchema);