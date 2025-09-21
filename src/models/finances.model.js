import mongoose from "mongoose";

const financeSchema = new mongoose.Schema({
    type: { 
        type: String, enum: ["ingreso", "gasto", "deuda", "ahorro"], 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true,
        min: 0.01
    }, //monto de dinero debe ser mayor a 0
    paymentMethod:{
        type: String,
        enum: ["efectivo", "cuenta ahorros", "cuenta nomina", "credito"]
    },
    category: { 
        type: String, 
        enum: ["hogar", "alimentación", "emprendimiento", "transporte", "salud", "educación", "ocio y entretenimiento", "cuidado personal", "compras", "otros"],
        default: "otros"
    },// categoria del monto
    description: { 
        type: String 
    },
    scheduleAt:{
        type: Date
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    status : {
        type: String, enum: ['pendiente', 'completado'], 
        default: 'completado'
    },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', //Collection name en DB
    
    },

});

export const financeModel = mongoose.model("finances", financeSchema);
