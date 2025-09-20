import { verifyToken } from "../config/jwt.js";

export const auth = (requiredRol) => {
    return async (request, response, next) => {
        const token = request.headers["authorization"];
        console.log("Token recibido en la cabecera de la petición: " + token);

        if (!token) {
            return response.status(401).json({
                "mensaje": "No se encontro token, permiso denegado"
            });
        }

        // verificar que el token sea permitido
        const allowedToken = token.split(" ")[1];
        console.log("Token después de separarlo del Bearer: " + allowedToken);
        try {
            const decoded = await verifyToken(allowedToken);
            console.log("Información decodificada del token: ", decoded);

            // Verificar si el rol es administrador
            if (requiredRol === "admin" && decoded.admin === false) {
                return response.status(401).json({
                    "mensaje": "Acceso no permitido, no eres administrador"
                });
            }

        } catch (error) {
            return response.status(401).json({
                "mensaje": "Falló la autentificación: Token no permitido "
            });

        }

        next();
    }
}