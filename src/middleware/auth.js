import { verifyToken } from "../config/jwt.js";
export const auth = (requiredRol) => {
    return async (request, response, next) => {
        const token = request.headers["authorization"];

        if (!token) {
            return response.status(401).json({
                "mensaje": "No se encontro token, permiso denegado"

            });
        }

        // verificar que el token sea permitido
        const allowedToken = token.split(" ")[1];
        try {
            const decoded = await verifyToken(allowedToken);

            // Verificar si el rol es administrador
            if (requiredRol === "admin" && decoded.admin === false) {
                return response.status(401).json({
                    "mensaje": "Acceso no permitido, no eres administrador"
                });
            }

        } catch (error) {
            return response.status(401).json({
                mensaje: "Falló la autentificación: Token no permitido "
            });

        }

        next();
    }
}