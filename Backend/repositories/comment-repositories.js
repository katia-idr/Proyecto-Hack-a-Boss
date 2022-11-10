const getDB = require('../db/getDB');

async function createComent(body, idPost, userId) {
    let connection;

    connection = await getDB();

    const [{ insertId }] = await connection.query(
        `INSERT INTO comment (body, createdAt, idUser, idPost)
            VALUES (?, ?, ?, ?)`,
        [body, new Date(), userId, idPost]
    );

    return insertId;
}

async function selectCommentById(idComment) {
    let connection;
    try {
        connection = await getDB();

        const [[comment]] = await connection.query(
            `SELECT comment.body, comment.idUser, user.name, user.username, user.avatar FROM comment INNER JOIN user ON (comment.idUser=user.id)
            WHERE comment.id= ? `,
            [idComment]
        );
        return comment;
    } finally {
        if (connection) connection.release();
    }
}
module.exports = { createComent, selectCommentById };
