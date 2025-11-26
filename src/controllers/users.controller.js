import { userModel } from "../models/users.model.js";
import bcryptjs from "bcryptjs";

// Método POST
export const postUser = async (request, response) => {
    try {
        const { password } = request.body;
        const codedPassword = await bcryptjs.hash(password, 10);
        const newUser = {
            ...request.body,
            // profile: `/profile/${request.file.filename}`,
            password: codedPassword
        }

        if (request.file) {
            newUser.profile = `/profile/${request.file.filename}`;
        }

        await userModel.create(newUser);
        return response.status(201).json({
            "mensaje": "¡Genial! ahora puedes organizar tus finanzas y metas con calma y claridad en Finstaska"
        });

    } catch (error) {
        return response.status(400).json({
            "mensaje": "El registro no salió como esperabamos, verifica tus datos e inténtalo nuevamente",
            "error": error.message || error
        })
    }
}

// Método GET
export const getAllUsers = async (request, response) => {
    try {
        const allUsers = await userModel.find();
        return response.status(200).json({
            "mensaje": `Hemos encontrado ${allUsers.length} usuarios registrados en Fintaska`,
            "data": allUsers
        });

    } catch (error) {
        return response.status(500).json({
            "mensaje": "An error occurred while getting users.",
            "error": error.message || error
        })
    }
}

// Método GET por id
export const getUserById = async (request, response) => {
    try {
        const idForGet = request.params.id;
        const user = await userModel.findById(idForGet).populate("planner.board").populate("planner.tasks").populate("planner.notifications").populate("planner.finances");
        if (!user) {
            return response.status(404).json({
                "mesage": "User not found"
            })
        }
        return response.status(200).json({
            "message": "User found",
            "data": user
        });
    } catch (error) {
        return response.status(500).json({
            "message": "An error occurred while getting users.",
            "error": error.message || error
        })
    }
}

// Método PUT
export const putUserById = async (request, response) => {
    try {
        const idForUpdate = request.params.id;
        const updateUser = { ...request.body };
        console.log("Actualizado antes de condicionales", updateUser);
        if (request.file) {
            updateUser.profile = `/profile/${request.file.filename}`
        }
        if (updateUser.password) {
            const { password } = request.body;
            const codedPassword = await bcryptjs.hash(password, 10);
            updateUser.password = codedPassword;
        }

        console.log("Actualizado despues de condicionales", updateUser);
        await userModel.findByIdAndUpdate(idForUpdate, updateUser);
        return response.status(201).json({
            "message": "Tu usuario ha sido actualizado, sigue con el control de tus actividades"
        });

    } catch (error) {
        return response.status(400).json({
            "message": "Ups! Ocurrió un error al actualizar tu usuario, vuelve a intentarlo",
            "error": error.message || error
        })
    }
}

// Metodo PATCH contraseña
export const userPasswordById = async (request, response) => {
    const userId = request.params.id;
    const { currentPassword, newPassword } = request.body;

    if (!currentPassword || !newPassword) {
        return response.status(400).json({
            "message": "Debes ingresar la contraseña actual y la nueva contraseña."
        });
    }

    if (newPassword.length < 8) {
        return response.status(400).json({
            "message": "La nueva contraseña debe tener al menos 8 caracteres."
        });
    }
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return response.status(404).json({
                "message": "Usuario no encontrado."
            });
        }

        // Verificar la contraseña actual
        const isMatch = await bcryptjs.compare(currentPassword, user.password);
        if (!isMatch) {
            return response.status(400).json({
                "message": "Tu contraseña actual ingresada es incorrecta."
            });
        }

        // Hashear la nueva contraseña
        const salt = await bcryptjs.genSalt(10);
        const hashedNewPassword = await bcryptjs.hash(newPassword, salt);

        user.password = hashedNewPassword;

        await user.save();
        return response.status(200).json({
            "message": "Tu contraseña ha sido actualizada exitosamente."
        });
    } catch (error) {
        return response.status(500).json({
            "message": "Ocurrió un error al actualizar la contraseña, intentalo nuevamente.",
            "error": error.message || error
        });
    }
}

// Método DELETE
export const deleteUserById = async (request, response) => {
    try {
        const idForDelete = request.params.id;

        await userModel.findByIdAndDelete(idForDelete);

        return response.status(200).json({
            "message": "User successfully deleted"
        });

    } catch (error) {
        return response.status(400).json({
            "message": "An error occurred while deleting the user.",
            "error": error.message || error
        })
    }
}