const { unlink } = require('fs/promises');

const path = require('path');
const sharp = require('sharp');
const uuid = require('uuid');

// Creamos la ruta absoluta a la carpeta de avatares
const avatarDir = path.join(__dirname, 'static/avatar');

//Creamos la ruta absoluta a la carpeta de post
const postDir = path.join(__dirname, 'static/post');

//Función que genera un error
function generateError(message, code) {
    const error = new Error(message);
    error.httpStatus = code;
    return error;
}

//Función que valida un schema
async function validate(schema, data) {
    try {
        await schema.validateAsync(data);
    } catch (error) {
        error.httpStatus = 400;
        throw error;
    }
}

//Función para borrar imágenes
async function deletePhoto(photoName, type) {
    try {
        let photoPath;

        if (type === 0) {
            photoPath = path.join(avatarDir, photoName);
        } else if (type === 1) {
            photoPath = path.join(postDir, photoName);
        }

        await unlink(photoPath);
    } catch (error) {
        throw new Error(
            'Se ha producido un error al eliminar la imagen del servidor. Por favor intentalo de nuevo.'
        );
    }
}

//Función para guardar imágenes
async function savePhoto(imagen, type) {
    try {
        const sharpImage = sharp(imagen.data);
        let imageDirectory;
        const imageName = uuid.v4() + '.jpg';

        if (type === 0) {
            imageDirectory = path.join(avatarDir, imageName);
            sharpImage.resize(150, 150);
        } else if (type === 1) {
            imageDirectory = path.join(postDir, imageName);
            sharpImage.resize(1000, 1000);
        }
        await sharpImage.toFile(imageDirectory);

        return imageName;
    } catch (error) {
        throw new Error(
            'Ha habido un error al procesar la imagen. Intentalo de nuevo.'
        );
    }
}

module.exports = {
    generateError,
    validate,
    savePhoto,
    deletePhoto,
};
