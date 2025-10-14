import { userModel } from "../models/users.model.js";
import { generateToken } from "../config/jwt.js";
import bcryptjs from "bcryptjs";

export const login = async (request, response) => {
    try {
        const { emailLogin, passwordLogin } = request.body;

        const userFound = await userModel.findOne({
            email: emailLogin
        });

        console.log("usuario encontrado exitosamente:", userFound);

        if (!userFound) {
            return response.status(404).json({
                "mensaje": "Ups!, no te hemos encontrado, registrate y se parte de Fintaska ahora mismo"
            });
        }

        // validacion constraseña correcta
        const validPassword = await bcryptjs.compare(passwordLogin, userFound.password);

        if (!validPassword) {
            return response.status(401).json({
                "mensaje": "Ups! contraseña incorrecta, ingresala nuevamente"
            });
        }

        //Generacion del token
        const payload = {
            id: userFound._id,
            user: userFound.username
        }


        if (userFound.rol === "admin") {
            payload.admin = true;
        } else {
            payload.admin = false;
        }

        const token = await generateToken(payload);
        console.log("payload: ", payload);
        console.log("token", token);

        return response.status(200).json({
            "mensaje": `Hola ${userFound.username}, estamos felices de que estés nuevamente en Finstaska`,
            "token": token
        });
    } catch (error) {
        return response.status(401).json({
            "mensaje": "Algo no está está bien, por favor revisa tu información e intentalo nuevamente",
            "error" : error.message || error
        });

    }

}