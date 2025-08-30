import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true 
},
  username: { 
    type: String 
},
  email: { 
    type: String, 
    required: true, 
    unique: true 
},
  password: { 
    type: String, 
    required: true 
},
  rol: { 
    type: String, 
    enum: ["usuario", "admin"], 
    default: "usuario" 
},
  registerDate: { 
    type: Date, 
    default: Date.now 
},
  settings: {
    theme: { 
        type: String, 
        default: "light" 
    },
    notifications: { 
        type: Boolean, 
        default: true 
    }
  }
});

export const userModel = mongoose.model("users", userSchema);