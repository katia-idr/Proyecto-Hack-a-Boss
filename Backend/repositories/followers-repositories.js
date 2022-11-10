const getDB = require('../db/getDB');

//Función que nos dice si el perfil que visito está en mis seguidos
async function checkFollower(followerId, userId) {
    let connection;
    try {
        connection = await getDB();

        const [checkFollower] = await connection.query(
            `
        SELECT * FROM follower WHERE idFollower = ? AND idUser=?`,
            [followerId, userId]
        );

        return checkFollower;
    } finally {
        if (connection) connection.release();
    }
}

//Función que inserta el userFollow a la tabla follower
async function selectFollower(followerId, userId) {
    let connection;
    try {
        connection = await getDB();
        await connection.query(
            `INSERT INTO follower (idFollower, idUser)
        VALUES (?,?)`,
            [followerId, userId]
        );
    } finally {
        if (connection) connection.release();
    }
}

//Función que borra al usuario de mis follower
async function unselectFollower(followerId, userId) {
    let connection;
    try {
        connection = await getDB();
        await connection.query(
            `DELETE FROM follower WHERE idFollower = ? AND idUser = ?`,
            [followerId, userId]
        );
    } finally {
        if (connection) connection.release();
    }
}

module.exports = { checkFollower, selectFollower, unselectFollower };
