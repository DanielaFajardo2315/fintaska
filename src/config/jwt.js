// Importar dependencias y modulos
import dotenv from "dotenv"
import jsonwebtoken from "jsonwebtoken";


//Configurar variables de entorno
dotenv.config();
const key = process.env.SECRET_KEY


// Configurar uso de jsonwebtoken
//3.1 metodo generar JWT
export const generateToken = (payload) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken.sign(payload, key, { expiresIn: "1h" }, (error, token) => {
            if (error) {
                reject(new Error("Hubo un error algenerar JWT", error.message))
            } else {
                resolve(token);
            }
        });
    });
}


//3.2 metodo verificar JWT
export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken.verify(token, key, (error, decoded) => {
            if (error) {
                reject(new Error("Ocurrio un error al verificar el JWT", error.message));
            } else {
                resolve(decoded);
            }
        });
    });
}
