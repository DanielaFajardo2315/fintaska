
import { financeModel } from "../models/finances.model.js";

// CREAR Movimiento Financiero - POST
export const createFinanceEntry = async (request, response) =>{
    try {
        const { type, amount, paymentMethod, category, description, date, status, user, scheduleAt } = request.body;

        const financialMove = await financeModel.create({
            type, amount, paymentMethod, category, description, date, status, user, scheduleAt}
        );
        
        return response.status(201).json({
            "message": "Movimiento en Finanzas Creado Exitosamente",
            financialMove
        });    
    } catch (error) {
        return response.status(400).json({
            "mensaje": "Ocurrio un error al CREAR entrada en finanzas",
            "error" : error.message || error
        })     
    }
}


//MOSTRAR TODOS los ingresos financieros Usuario - GET
export const getFinancial = async (request, response) =>{
    try {

        const financialMove = await financeModel.find().sort({ fecha: -1 });

        return response.status(200).json({
            message: ` ${financialMove.length} ingresos en finanzas encontrados `,
            financialMove
        });
    } catch (error) {
        return response.status(400).json({
            "mensaje": "Ocurrio un error al MOSTRAR TODAS las entradas en finanzas",
            "error" : error.message || error
        })
    }
}


// ACTUALIZAR  un movimiento por id - PUT
export const updateFinancialMove = async (request, response) => {
    try {
        const { id } = request.params;

        const financialMove = await financeModel.findByIdAndUpdate(
        id,
        { ...request.body, updateDate: new Date() },
        { new: true }
        );

        if (!financialMove) {
        return response.status(404).json({ error: "Movimiento en finanzas no encontrado" });
        }

        return response.json({
        message: "Movimiento actualizado",
        financialMove
        });
    } catch (error) {
        return response.status(400).json({
            "mensaje": "Ocurrio un error al ACTUALIZAR la entrada en finanzas",
            "error" : error.message || error
        })
    }

}

// ELIMINAR MOVIMIENTO
export const deleteFinancialMove = async (request, response) => {
  try {
    const { id } = request.params;

    const financialMove = await financeModel.findById(id);
    if (!financialMove) {
      return response.status(404).json({ error: "Movimiento en finanzas no encontrado" });
    }

    await financeModel.findByIdAndDelete(id);

    response.json({ message: "Movimiento eliminado" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

