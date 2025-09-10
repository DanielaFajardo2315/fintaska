import { userModel } from "../models/users.model.js";
import bcryptjs from "bcryptjs";

// Método POST
export const postUser = async (request, response) => {
    try {
        const { fullName, username, email, password, rol } = request.body;
        const codedPassword = await bcryptjs.hash(password, 10);
        await userModel.create({
            fullName,
            username,
            email,
            password: codedPassword,
            rol
        });

        return response.status(201).json({
            "message": "User created correctly"
        });

    } catch (error) {
        return response.status(400).json({
            "message": "An error occurred while creating the product.",
            "error": error.message || error
        })
    }
}

// Método GET
export const getAllUsers = async (request, response) => {
    try {
        const allUsers = await userModel.find();
        return response.status(200).json({
            "message": "Users found",
            "data": allUsers
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
        const { fullName, username, email, password, rol, settings, planner } = request.body;

        const updateData = {
            fullName,
            username,
            email,
            rol,
            settings,
            planner
        };

        if (password) {
            const codedPassword = await bcryptjs.hash(password, 10);
            
            updateData.password = codedPassword;
        }

        await userModel.findByIdAndUpdate(idForUpdate, updateData);

        return response.status(200).json({
            "message": "User successfully updated"
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