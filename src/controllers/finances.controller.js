import { financeModel } from "../models/finances.model.js";

// CREAR Movimiento Financiero - POST
export const createFinanceEntry = async (request, response) =>{
    try {
        const { type, amount, paymentMethod, category, description, date, status, user, scheduleAt } = request.body;

        const financialMove = await financeModel.create({
            type, amount, paymentMethod, category, description, date, status, user, scheduleAt}
        );
        if (financialMove.type === "ingreso"){
            return response.status(201).json({
            "message": "¡Movimiento guardado! Tus finanzas se mantienen al día",
            financialMove
        });
        } else if (financialMove.type === "gasto"){
            return response.status(201).json({
            "message": "¡Movimiento guardado! Recuerda controlar tus gastos",
            financialMove
        });
        } else if (financialMove.type === "deuda"){
            return response.status(201).json({
            "message": "¡Movimiento guardado! Recuerda hacerle seguimiento a este compromiso",
            financialMove
        });
        } else {
            return response.status(201).json({
            "message": "¡Movimiento guardado! Sigue ahorrando para mejorar tus finanzas",
            financialMove
        });
        }
        
    } catch (error) {
        return response.status(400).json({
            "mensaje": "Ha ocurrido un error al registrar tus finanzas, intenta de nuevo",
            "error" : error.message || error
        })     
    }
}


//MOSTRAR TODOS los ingresos financieros Usuario - GET
export const getFinancial = async (request, response) =>{
    try {

        const financialMove = await financeModel.find().sort({ date: -1 });

        return response.status(200).json({
            message: `Hemos encontrado ${financialMove.length} movimientos financieros `,
            financialMove
        });
    } catch (error) {
        return response.status(400).json({
            "mensaje": "Ha ocurrido un error al mostar tus movimientos financieros, intenta de nuevo",
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
        return response.status(404).json({ error: "No encontramos tu movimiento, busca nuevamente" });
        }

        return response.json({
        message: "Actualizamos tu movimiento exitosamente",
        financialMove
        });
    } catch (error) {
        return response.status(400).json({
            "mensaje": "Ha ocurrido un error al actualizar tu movimiento financiero, intenta de nuevo",
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
      return response.status(404).json({ error: "No encontramos tu movimiento, busca nuevamente" });
    }

    await financeModel.findByIdAndDelete(id);

    response.json({ message: "Se ha eliminado tu movimiento, puedes seguir registrando y organizando a tu ritmo" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

