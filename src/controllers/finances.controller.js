
import { financeModel } from "../models/finances.model.js";
import { tasksModel } from "../models/tasks.model.js";
import { userModel } from "../models/users.model.js";

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

/* //CREAR MOVIMIENTO - POST -AVANZADO + RECORDATORIO new y save
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
 */

//------------------------
//MOSTRAR TODOS los ingresos financieros Usuario - GET
export const getFinancialMoveByUser = async (request, response) =>{
    try {
        const { userId } = request.params;

        const financialMove = await financeModel.find({ user: userId }).sort({ fecha: -1 });

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

/* // LISTAR MOVIMIENTOS FINANCIEROS CON FILTROS -AVANZADO- GET

export const getFinancialMoveByUser =async(request,response) => {
    try {
        const { userId } = request.params;
        const { type, category, status, dateSince, dateUntil, limit = 50 } = request.query;

        let filter = { user: userId };
        if (type) filter.tipo = tipo;
        if (category) filter.category = category;
        if (status) filter.status = status;
        if (dateSince || dateUntil) {
        filter.fecha = {};
        if (fechaDesde) filtros.fecha.$gte = new Date(fechaDesde);
        if (fechaHasta) filtros.fecha.$lte = new Date(fechaHasta);
        }

        const movimientos = await financeModelModel.find(filter)
        .populate("user", "fullName email")
        .sort({ fecha: -1 })
        .limit(parseInt(limit));

        res.json({
            message: `${movimientos.length} movimientos encontrados`,
            filtros,
            movimientos,
        });
    } catch (error) {
        return response.status(400).json({
            "mensaje": "Ocurrio un error al mostrar tus entreadas en finanzas",
            "error" : error.message || error
        })        
    }

} */

//---------------------------

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


/* // ACTUALIZAR MOVIMIENTO -PUT - AVANZADO con fecha actualizacion

export const updateFinancialMove = async (req, res) => {
  try {
        const { id } = req.params;
        const dataForUpdate = { ...req.body, dateUpdate: new Date() };

        const financialMoveUpdated = await financeModel.findByIdAndUpdate(
        id,
        dataForUpdate,
        { new: true }
        );

        if (!financialMoveUpdated) {
        return res.status(404).json({ error: "Movimiento no encontrado" });
        }

        return res.status(200).json({
        message: "Movimiento en finanzas actualizado",
        movimiento: financialMoveUpdated,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
} */

//----------------------------------------------

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

