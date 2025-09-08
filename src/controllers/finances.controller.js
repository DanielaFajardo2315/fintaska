
import { financeModel } from "../models/finances.model.js";

//CREAR MOVIMIENTO - POST 
export const createFinanceEntry = async (request, response) => {
    try {
        const { userId } = request.params;
        const { type, amount, paymentMethod, category, description, date, status} = request.body;

        const newFinanceEntry = new financeModel({
            type,
            amount,
            paymentMethod,
            category,
            description,
            date: date || new Date(),
            status: status || 'completado',
            user: userId
        });

        const saveFinanceEntry = await createFinanceEntry.save();
        return res.status(201).json({
            message: "Movimiento creado y recordatorio agregado al planner",
            movimiento: saveFinanceEntry,
            //recordatorio: tareaGuardada,
        });

    } catch (error) {
        return response.status(400).json({
            "mensaje": "Ocurrio un error al crear entreada en finanzas",
            "error" : error.message || error
        })
    }    
}

// LISTAR MOVIMIENTOS FINANCIEROS CON FILTROS - GET

export const getFinancialMoveByUser =async(request,response) => {
    try {
        
    } catch (error) {
        
    }

}

// ACTUALIZAR MOVIMIENTO 



//ELIMINAR MOVIMIENTO