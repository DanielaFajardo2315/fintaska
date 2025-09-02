import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    mesage: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String, 
        enum: ["tarea", "finanza", "documento", "motivacional"], 
        default: "tarea" 
    },
    read: { 
        type: Boolean, 
        default: false 
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

export const notificationModel = mongoose.model("notifications", notificationSchema);