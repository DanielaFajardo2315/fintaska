//1. Importar dependencias y modulos necesarios
import { boardsModel } from "../models/boards.model.js";


//. Metodo CREAR un tablero - POST
export const postBoard = async (request, response) => {
    try {
        // Validación de que si exista el archivo enviado
        const newBoard = request.body;   // aquí se guarda todo el body tal cual viene
        const files = request.files;     // aquí se guardan los archivos subidos

        if (files && files['urlImage']) {
            newBoard.urlImage = `/images/${files['urlImage'][0].filename}`;
        }

        if (files && files['urlFile']) {
            newBoard.urlFile = `/files/${files['urlFile'][0].filename}`;
        } 

        await boardsModel.create(newBoard);

        return response.status(201).json({ mensaje: "¡Perfecto! Tu nueva nota está lista para llenarse de ideas e inspiración." });

    } catch (error) {
        return response.status(400).json({
            "mensaje": "Ups! No se ha creado tu nota, intentalo nuevamente",
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
            "mensaje": "Ups! No se han podido mostrar tus notas, intentalo nuevamente",
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
                "mensaje": "No hemos encontrado notas con esa etiqueta, revisa la etiqueta que buscas"
            });
        }

        return response.status(200).json({
            "mensaje": `Notas filtradas por ${tagForBoard}`,
            "data": boardTag
        });

    } catch (error) {
        return response.status(500).json({
            "mensaje": "Ups! No se han podido mostrar tus notas, intentalo nuevamente",
            "error": error.message || error
        });

    }

}

//3. Metodo Actualizar Tablero - PUT
export const putBoardById = async (request, response) => {

    try {
        const idForUpdate = request.params.id;
        // const dataForUpdate = request.body;

        // await boardsModel.findByIdAndUpdate(idForUpdate, dataForUpdate);
        // return response.status(200).json({
        //     "mensaje": "Tablero Actualizado exitosamente"
        // });
        const updateBoard = await boardsModel.findById(idForUpdate);   // aquí se guarda todo el body tal cual viene
        const updateData = request.body;
        const files = request.files;     // aquí se guardan los archivos subidos

        if (files && files['urlImage']) {
            // updateBoard.urlImage = `/images/${files['urlImage'][0].filename}`;
            files['urlImage'].forEach(file => {
            updateBoard.urlImage.push(`/images/${file.filename}`);
        });
        }

        if (files && files['urlFile']) {
            // updateBoard.urlFile = `/files/${files['urlFile'][0].filename}`;
            files['urlFile'].forEach(file => {
            updateBoard.urlFile.push(`/files/${file.filename}`);
        });
        }

        // await boardsModel.findByIdAndUpdate(idForUpdate, updateBoard);

        const board = await boardsModel.findByIdAndUpdate(
        idForUpdate,
        {
            ...updateData,
            urlImage: updateBoard.urlImage,
            urlFile: updateBoard.urlFile
        },
        { new: true } // Esto devuelve el documento actualizado
    );

        return response.status(201).json({ mensaje: "¡Hecho! Tu nota luce genial" });

    } catch (error) {
        return response.status(500).json({
            "mensaje": "Ups! ocurrió un error al actualizar tu nota, intentalo nuevamente",
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
            "mensaje": "¡Listo! Nota eliminada, ahora tienes espacio para una nueva idea",
        })

    } catch (error) {
        return response.status(500).json({
            "mensaje": "Ups! ocurrió un error al eliminar tu nota, intentalo nuevamente",
            "error": error.message || error
        });


    }
}