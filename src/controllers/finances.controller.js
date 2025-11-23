import { financeModel } from "../models/finances.model.js";
import { userModel } from "../models/users.model.js";

// CREAR Movimiento Financiero - POST
export const createFinanceEntry = async (request, response) =>{
    try {
        const { type, amount, paymentMethod, category, description, date, status, user, scheduleAt } = request.body;

        //Validar envio de usuario
        if (!user) {
            return response.status(400).json({
                message: "El ID de usuario es requerido"
            });
        }

        //Validar que existe usuario
        const userExists = await userModel.findById(user);
        if (!userExists) {
            return response.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        //Crear movimiento financiero
        const financialMove = await financeModel.create({
            type, amount, paymentMethod, category, description, date, status, user, scheduleAt
        });

        //Agregar la finanza al usuario
        await userModel.findByIdAndUpdate(
            user,
            { $push: { "planner.finances": financialMove._id } },
            { new: true }
        );

        // Mensajes segun tipo
        if (financialMove.type === "ingreso"){
            return response.status(201).json({
            message: "¡Movimiento guardado! Tus finanzas se mantienen al día",
            financialMove
        });
        } else if (financialMove.type === "gasto"){
            return response.status(201).json({
            message : "¡Movimiento guardado! Recuerda controlar tus gastos",
            financialMove
        });
        } else if (financialMove.type === "deuda"){
            return response.status(201).json({
            message: "¡Movimiento guardado! Recuerda hacerle seguimiento a este compromiso",
            financialMove
        });
        } else {
            return response.status(201).json({
            message: "¡Movimiento guardado! Sigue ahorrando para mejorar tus finanzas",
            financialMove
        });
        }
        
    } catch (error) {
        return response.status(400).json({
            message: "Ha ocurrido un error al registrar tus finanzas, intenta de nuevo",
            error : error.message || error
        })     
    }
}


/* MOSTRAR TODOS los ingresos financieros - GET
Filtrado por userID -> query  */
export const getFinancial = async (request, response) =>{
    try {
        const { userId } = request.query;
        let financialMove;
        let summary;
        let categoryDistribution = {};

        // Si no se envia usuario, muestra todas -> admin
         if (!userId) {
            financialMove = await financeModel.find().sort({ date: -1 });
            
            summary = {
                ingresos: financialMove.filter(f => f.type === 'ingreso').reduce((sum, f) => sum + f.amount, 0),
                gastos: financialMove.filter(f => f.type === 'gasto').reduce((sum, f) => sum + f.amount, 0),
                deudas: financialMove.filter(f => f.type === 'deuda').reduce((sum, f) => sum + f.amount, 0),
                ahorros: financialMove.filter(f => f.type === 'ahorro').reduce((sum, f) => sum + f.amount, 0)
            };

            return response.status(200).json({
                message: `Hemos encontrado ${financialMove.length} movimientos financieros`,
                summary,
                financialMove
            });
        }
        // Se envia userID - filtro por usuario
        const userExists = await userModel.findById(userId);
        if (!userExists) {
            return response.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        // Obtener finanzas del usuario específico
        financialMove = await financeModel.find({ user: userId }).sort({ date: -1 });

        // Calcular resumen para ese usuario
        summary = {
            ingresos: financialMove
                .filter(f => f.type === 'ingreso')
                .reduce((sum, f) => sum + f.amount, 0),
            
            gastos: financialMove
                .filter(f => f.type === 'gasto')
                .reduce((sum, f) => sum + f.amount, 0),
            
            deudas: financialMove
                .filter(f => f.type === 'deuda')
                .reduce((sum, f) => sum + f.amount, 0),
            
            ahorros: financialMove
                .filter(f => f.type === 'ahorro')
                .reduce((sum, f) => sum + f.amount, 0)
        };

        return response.status(200).json({
            message: `Hemos encontrado ${financialMove.length} movimientos financieros `,
            summary,
            financialMove
        });

    } catch (error) {
        return response.status(400).json({
            message: "Ha ocurrido un error al mostar tus movimientos financieros, intenta de nuevo",
            error : error.message || error
        })
    }
}


// ACTUALIZAR  un movimiento por id - PUT
export const updateFinancialMove = async (request, response) => {
    try {
        const { id } = request.params;
        const { userId } = request.body;

        // Buscar el movimiento
        const financeToUpdate = await financeModel.findById(id);

        if (!financeToUpdate) {
            return response.status(404).json({ 
                error: "No encontramos tu movimiento, busca nuevamente" 
            });
        }

        // Verificar que el movimiento es de usuario
        if (userId && financeToUpdate.user.toString() !== userId) {
            return response.status(403).json({
                error: "No tienes permiso para actualizar este movimiento"
            });
        }

        //Actualizar movimiento
        const financialMove = await financeModel.findByIdAndUpdate(
        id,
        { ...request.body, updateDate: new Date() }, 
        {   new: true,
            runValidators: true
        });

        return response.json({
        message: "Actualizamos tu movimiento exitosamente",
        financialMove
        });

    } catch (error) {
        return response.status(400).json({
            message : "Ha ocurrido un error al actualizar tu movimiento financiero, intenta de nuevo",
            error : error.message || error
        })
    }

}

// ELIMINAR MOVIMIENTO
export const deleteFinancialMove = async (request, response) => {
  try {
    const { id } = request.params;
    const { userId } = request.query;

    //Buscar movimiento
    const financialMove = await financeModel.findById(id);

    if (!financialMove) {
      return response.status(404).json({ error: "No encontramos tu movimiento, busca nuevamente" });
    }

    //Verificar movimiento es de usuario
    if (userId && financialMove.user.toString() !== userId) {
            return response.status(403).json({
                error: "No tienes permiso para eliminar este movimiento"
            });
        }

    //Eliminar movimiento del modelo usuario
    await userModel.findByIdAndUpdate(
            financialMove.user,
            { $pull: { "planner.finances": id } }
        );
    
    //Eliminar movimiento financiero
    await financeModel.findByIdAndDelete(id);

    response.json({ 
        message: "Se ha eliminado tu movimiento, puedes seguir registrando y organizando a tu ritmo" 
    });

} catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// // OBTENER RESUMEN FINANCIERO - GET
// // ============================================
// export const getFinancialSummary = async (request, response) => {
//     try {
//         // ⭐ userId viene del middleware auth
//         // const userId = request.userId;

//         // console.log("💰 Calculando resumen para usuario:", userId);

//         // Obtener todos los movimientos del usuario
//         const movements = await financeModel.find(); //{ user: userId }
        
//         // Calcular totales por tipo
//         const summary = {
//             ingresos: movements
//                 .filter(m => m.type === 'ingreso')
//                 .reduce((sum, m) => sum + m.amount, 0),
            
//             gastos: movements
//                 .filter(m => m.type === 'gasto')
//                 .reduce((sum, m) => sum + m.amount, 0),
            
//             deudas: movements
//                 .filter(m => m.type === 'deuda')
//                 .reduce((sum, m) => sum + m.amount, 0),
            
//             ahorros: movements
//                 .filter(m => m.type === 'ahorro')
//                 .reduce((sum, m) => sum + m.amount, 0)
//         };

//         // Calcular balance
//         summary.balance = summary.ingresos - summary.gastos - summary.deudas;
//         summary.totalMovimientos = movements.length;

//         console.log("✅ Resumen calculado:", summary);

//         return response.status(200).json({ 
//             message: "Resumen calculado exitosamente",
//             summary 
//         });
        
//     } catch (error) {
//         console.error("❌ Error al obtener resumen:", error);
//         return response.status(400).json({
//             mensaje: "Error al obtener resumen financiero",
//             error: error.message
//         });
//     }
// };