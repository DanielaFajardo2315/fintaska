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
        if (!user){
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
        const updateUser = {...request.body};
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
            "message": "User updated correctly"
        });

    } catch (error) {
        return response.status(400).json({
            "message": "An error occurred while updating the user.",
            "error": error.message || error
        })
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