import mongoose from "mongoose";
import { type } from "os";

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
    },
    scheduleAt: {
        type: Date,
        required: true
    }
});

export const notificationModel = mongoose.model("notifications", notificationSchema);