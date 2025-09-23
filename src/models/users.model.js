import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  profile: {
    type: String
  },
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
  },
  planner: {
    notifications: {
      type: [
        {type: mongoose.Schema.Types.ObjectId, ref: "notifications", required: false}
      ]
    },
    tasks: {
      type: [
        {type: mongoose.Schema.Types.ObjectId, ref: "tasks", required: false}
      ]
    },
    board: {
      type: [
        {type: mongoose.Schema.Types.ObjectId, ref: "boards", required: false}
      ]
    },
    finances: {
      type: [
        {type: mongoose.Schema.Types.ObjectId, ref: "finances", required: false}
      ]
    }
  }
});

export const userModel = mongoose.model("users", userSchema);