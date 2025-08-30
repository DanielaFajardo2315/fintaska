import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
//Nombre de usuario
userId: { 
    type: mongoose.Schema.Types.ObjectId, ref: "Usuario", 
    required: true },
//titulo de la actividad o tarea a realizar
 title: 
 { type: String, 
    required: true
 },
 //Descripción de la actividad
 description: 
 { type: String 

 },
 //Estado de la actividad
 estatus: 
 { type: String, 
    enum: ["pendiente", "en progreso", "realizada"], 
    default: "pendiente" 
},
//Categoria
 category:  { 
    type: String, 
    enum: ["hogar", "personal", "trabajo", "finanzas", "social", "otros"], 
    default: "personal" 
},
//Prioiridad
 priority: { 
    type: String, 
    enum: ["alta", "media", "baja"], 
    default: "media" 
},
//Fecha de creación
 creationDate: {
     type: Date, 
     default: Date.now 
    }
});

export const tasksModel = ("tasks", taskSchema);