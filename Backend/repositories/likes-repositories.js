const getDB = require('../db/getDB');

//Función que nos dice si el post tiene like o no
async function checkLikes(postId, userId) {
    let connection;
    try {
        connection = await getDB();

        const [checkLike] = await connection.query(
            `
        SELECT * FROM likes WHERE idPost = ? AND idUser=?`,
            [postId, userId]
        );

        return checkLike;
    } finally {
        if (connection) connection.release();
    }
}

//Función que crea nueva fila para un primer like de un usuario a un post
async function userLikesFirst(postId, userId) {
    let connection;
    try {
        connection = await getDB();
        await connection.query(
            `INSERT INTO likes (idPost, liked, idUser)
        VALUES (?,?,?)`,
            [postId, 1, userId]
        );
    } finally {
        if (connection) connection.release();
    }
}

//Función que pone la propiedad liked de la tabla likes en true(1)
async function userLikes(postId, userId) {
    let connection;
    try {
        connection = await getDB();

        await connection.query(
            `UPDATE likes SET liked = 1 WHERE idPost=? AND idUser=?`,
            [postId, userId]
        );
    } finally {
        if (connection) connection.release();
    }
}

//Función que pone la propiedad liked de la tabla likes en false(0)
async function userUnlikes(postId, userId) {
    let connection;
    try {
        connection = await getDB();

        await connection.query(
            `UPDATE likes SET liked = 0 WHERE idPost=? AND idUser= ?`,
            [postId, userId]
        );
    } finally {
        if (connection) connection.release();
    }
}

async function likesCounter(postId) {
    let connection;
    try {
        connection = await getDB();

        const [[numLikes]] = await connection.query(
            `SELECT COUNT(*) AS numLikes FROM likes WHERE idPost=? AND liked=?;`,
            [postId, 1]
        );

        return numLikes;
    } finally {
        if (connection) connection.release();
    }
}

module.exports = {
    checkLikes,
    userLikes,
    userUnlikes,
    userLikesFirst,
    likesCounter,
};
