import mongoose from "mongoose";

const financeSchema = new mongoose.Schema({
    usuarioId: { 
        type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true 
    },
    type: { 
        type: String, enum: ["ingreso", "gasto", "deuda", "ahorro"], 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    }, //monto de dinero
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
    date: { 
        type: Date, 
        default: Date.now 
    }
});

export const financeModel = mongoose.model("finances", financeSchema);
