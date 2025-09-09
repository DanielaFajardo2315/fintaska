
import { financeModel } from "../models/finances.model.js";
import { tasksModel } from "../models/tasks.model.js";
import { userModel } from "../models/users.model.js";

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

}

// ACTUALIZAR MOVIMIENTO 

const updateFinanceMove = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizar = { ...req.body, fechaActualizacion: new Date() };

    const movimientoActualizado = await financeModel.findByIdAndUpdate(
      id,
      datosActualizar,
      { new: true }
    );

    if (!movimientoActualizado) {
      return res.status(404).json({ error: "Movimiento no encontrado" });
    }

    res.json({
      message: "Movimiento actualizado",
      movimiento: movimientoActualizado,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ELIMINAR MOVIMIENTO
const deleteMovement = async (req, res) => {
  try {
    const { id } = req.params;

    const movimiento = await movementModel.findById(id);
    if (!movimiento) {
      return res.status(404).json({ error: "Movimiento no encontrado" });
    }

    await movementModel.findByIdAndDelete(id);

    res.json({ message: "Movimiento eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

