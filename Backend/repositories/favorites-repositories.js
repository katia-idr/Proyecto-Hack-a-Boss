const getDB = require('../db/getDB');

//Función que nos dice si el post tiene like o no
async function checkFavorites(postId, userId) {
    let connection;
    try {
        connection = await getDB();

        const [checkFavorite] = await connection.query(
            `
        SELECT * FROM favorite WHERE idPost = ? AND idUser=?`,
            [postId, userId]
        );

        return checkFavorite;
    } finally {
        if (connection) connection.release();
    }
}

//Función que inserta el post en la tabla de favoritos
async function insertFavoritePost(postId, userId) {
    let connection;
    try {
        connection = await getDB();
        await connection.query(
            `INSERT INTO favorite (idPost, idUser)
        VALUES (?,?)`,
            [postId, userId]
        );
    } finally {
        if (connection) connection.release();
    }
}

//Función que pone la propiedad liked de la tabla likes en false(0)
async function deleteFavoritePost(postId, userId) {
    let connection;
    try {
        connection = await getDB();
        await connection.query(
            `DELETE FROM favorite WHERE idPost = ? AND idUser = ?`,
            [postId, userId]
        );
    } finally {
        if (connection) connection.release();
    }
}

module.exports = { checkFavorites, insertFavoritePost, deleteFavoritePost };
