//1. Importar dependencias y modulos necesarios
import { boardsModel } from "../models/boards.model.js";


//. Metodo CREAR un producto - POST
export const postBoard = async (request, response) => {
    try {
        // Validación de que si exista el archivo enviado
        if(!request.file){
            return response.status(400).json({
                "message": "You need upload an image"
            });
        }
        // Organizo primero el producto que se va a crear
        const newProduct = {
            ...request.body,
            image: `/uploads/images/${request.file.filename}`
        }

        await productModel.create(newProduct);
        return response.status(201).json({
            "message": "Product created correctly"
        });

    } catch (error) {
        return response.status(400).json({
            "mensaje": "ocurrio un error al crear el Tablero",
            "error": error.message || error

        });
    }
}

//2. Metodo para MOSTRAR todos los tableros - GET
export const getAllBoards = async (request, response) => {
    try {
        const allBoards = await boardsModel.find();
        return response.status(200).json({
            "mensaje": "Tablero mostrado exitosamente",
            "data": allBoards
        });

    } catch (error) {
        return response.status(500).json({
            "mensaje": "Ocurrio un error al mostrar el tablero",
            "error": error.message || error
        });

    }

}

export const getBoardByTag = async (request, response) => {
    try {
        const tagForBoard = request.params.tag;
        const boardTag = await boardsModel.find({ tag: { $in: [tagForBoard] } });
           if (boardTag.length === 0) {
            return response.status(404).json({
                "mensaje": "No se encontraron tableros con esa etiqueta"
            });
        }

        return response.status(200).json({
            "mensaje": "Tableros mostrados exitosamente",
            "data": boardTag
        });

    } catch (error) {
        return response.status(500).json({
            "mensaje": "Ocurrio un error al mostrar el tablero",
            "error": error.message || error
        });

    }

}

    //3. Metodo Actualizar Tablero - PUT
    export const putBoardById = async (request, response) => {

        try {
            const idForUpdate = request.params.id;
            const dataForUpdate = request.body;

            await boardsModel.findByIdAndUpdate(idForUpdate, dataForUpdate);
            return response.status(200).json({
                "mensaje": "Tablero Actualizado exitosamente"
            });

        } catch (error) {
            return response.status(500).json({
                "mensaje": "Ocurrio un error al actualizar el tablero",
                "error": error.message || error
            });

        }
    }


    //4. Método para ELIMINAR -> DELETE
    export const deleteBoardById = async (request, response) => {

        try {
            const idForDelete = request.params.id;
            await boardsModel.findByIdAndDelete(idForDelete);

            return response.status(200).json({
                "mensaje": "Tablero eliminado exitosamente",
            })

        } catch (error) {
            return response.status(500).json({
                "mensaje": "Ocurrio un error al eliminar tablero",
                "error": error.message || error
            });


        }
    }