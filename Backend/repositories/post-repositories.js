const { savePhoto } = require('../helpers');
const getDB = require('../db/getDB');

//Función que añade a la tabla post los datos recibidos

async function createPost(authorComment, hashtag, idUser) {
    let connection;
    try {
        connection = await getDB();

        const [{ insertId }] = await connection.query(
            `INSERT INTO post (authorComment, hashtag, createdAt, idUser)
                VALUES (?, ?, ?, ?)`,

            [authorComment, hashtag, new Date(), idUser]
        );

        return insertId;
    } finally {
        if (connection) connection.release();
    }
}

//Función que guarda las fotos recibidas en el servidor y en la BBDD
async function insertPhoto(postPhotos, postId) {
    let connection;
    try {
        connection = await getDB();

        let photosNames = [];

        for (let i = 0; i < postPhotos.length; i++) {
            const photoName = await savePhoto(postPhotos[i], 1);

            await connection.query(
                `INSERT INTO photo (name, idPost)
            VALUES (?,?)`,
                [photoName, postId]
            );

            photosNames.push(photoName);
        }

        return photosNames;
    } finally {
        if (connection) connection.release();
    }
}

async function insertLike(postId, userId) {
    let connection;
    try {
        connection = await getDB();

        await connection.query(
            `INSERT INTO likes (liked, idPost, idUser)
                VALUES (?, ?, ?)`,
            [0, postId, userId]
        );
    } finally {
        if (connection) connection.release();
    }
}

//Función que devuelve los post en base a una búsqueda
async function getPostsBySearch(search) {
    let connection;
    try {
        connection = await getDB();

        const [posts] = await connection.query(
            `
        SELECT post.id AS idPost, post.authorComment, post.hashtag, user.id AS idUser, user.username, user.name, user.lastname, user.avatar, user.privacy
        FROM post INNER JOIN user ON post.idUser = user.id
        WHERE authorComment LIKE ? OR hashtag LIKE ?
        ORDER BY post.createdAt DESC `,
            [`%${search}%`, `%${search}%`]
        );

        return posts;
    } finally {
        if (connection) connection.release();
    }
}

//Función que devuelve todos los post
async function getPostsByOrderDirection() {
    let connection;
    try {
        connection = await getDB();

        const [posts] = await connection.query(
            `
            SELECT post.id AS idPost, post.authorComment, post.hashtag, user.id AS idUser, user.username, user.name, user.lastname, user.avatar, user.privacy
            FROM post INNER JOIN user ON post.idUser = user.id
            ORDER BY post.createdAt DESC`
        );

        return posts;
    } finally {
        if (connection) connection.release();
    }
}

//Función que devuelve los post de usuarios publicos en base a una búsqueda
async function getPublicPostsBySearch(search) {
    let connection;
    try {
        connection = await getDB();

        const [posts] = await connection.query(
            `
        SELECT post.id AS idPost, post.authorComment, post.hashtag, user.id AS idUser, user.username, user.name, user.lastname, user.avatar, user.privacy
        FROM post INNER JOIN user ON post.idUser = user.id
        WHERE user.privacy = ? AND authorComment LIKE ? OR hashtag LIKE ?
        ORDER BY post.createdAt DESC`,
            ['public', `%${search}%`, `%${search}%`]
        );

        return posts;
    } finally {
        if (connection) connection.release();
    }
}

//Función que devuelve los post publicos
async function getPublicPostsByOrderDirection() {
    let connection;
    try {
        connection = await getDB();

        const [posts] = await connection.query(
            `
            SELECT post.id AS idPost, post.authorComment, post.hashtag, user.id AS idUser, user.username, user.name, user.lastname, user.avatar, user.privacy
            FROM post INNER JOIN user ON post.idUser = user.id WHERE user.privacy = ?
            ORDER BY post.createdAt DESC`,
            ['public']
        );

        return posts;
    } finally {
        if (connection) connection.release();
    }
}

//Función que devuelve un post por ID
async function getPostById(idPost) {
    let connection;
    try {
        connection = await getDB();

        const [post] = await connection.query(
            `SELECT post.id AS idPost, post.authorComment, post.hashtag, user.id AS idUser, user.username, user.name, user.lastname, user.avatar,user.privacy
            FROM post INNER JOIN user ON (post.idUser = user.id)
            WHERE post.id = ?`,
            [idPost]
        );

        return post;
    } finally {
        if (connection) connection.release();
    }
}

//Función que devuelve un post por ID y usuario
async function getPostByIdandUser(idPost, idUser) {
    let connection;
    try {
        connection = await getDB();

        const [post] = await connection.query(
            `SELECT post.id AS idPost, post.authorComment, post.hashtag, user.id AS idUser, user.username, user.name, user.lastname, user.avatar
            FROM post INNER JOIN user ON (post.idUser = user.id)
            WHERE post.id = ? AND post.idUser = ?`,
            [idPost, idUser]
        );

        return post;
    } finally {
        if (connection) connection.release();
    }
}

//Función que devuelve las fotos de un post
async function postPhotos(idPost) {
    let connection;
    try {
        connection = await getDB();

        const [photos] = await connection.query(
            `SELECT name FROM photo
        WHERE idPost = ?`,
            [idPost]
        );

        return photos;
    } finally {
        if (connection) connection.release();
    }
}

//Función que devuelve los comentarios de un post
async function postComments(idPost) {
    let connection;
    try {
        connection = await getDB();

        const [comments] = await connection.query(
            `SELECT comment.body, comment.idUser, user.name, user.username, user.lastname, user.avatar FROM comment INNER JOIN user ON (comment.idUser=user.id)
            WHERE idPost = ? 
            ORDER BY comment.createdAt DESC`,
            [idPost]
        );
        return comments;
    } finally {
        if (connection) connection.release();
    }
}

//Función que elimina la foto de la base de datos
async function deletePhotofromDB(idPost) {
    let connection;
    try {
        connection = await getDB();

        await connection.query(`DELETE FROM photo WHERE idPost = ?`, [idPost]);
    } finally {
        if (connection) connection.release();
    }
}

//Función que elimina el post de la base de datos
async function deletePostfromDB(idPost) {
    let connection;
    try {
        connection = await getDB();

        await connection.query(`DELETE FROM post WHERE id = ?`, [idPost]);
    } finally {
        if (connection) connection.release();
    }
}

//Función que selecciona que la contraseña del usuario
async function selectPassword(idUser) {
    let connection;
    try {
        connection = await getDB();

        const [user] = await connection.query(
            `select password from user where id = ?`,
            [idUser]
        );
        return user;
    } finally {
        if (connection) connection.release();
    }
}

module.exports = {
    createPost,
    insertPhoto,
    insertLike,
    getPostsBySearch,
    getPostsByOrderDirection,
    getPublicPostsBySearch,
    getPublicPostsByOrderDirection,
    postPhotos,
    postComments,
    getPostById,
    deletePhotofromDB,
    deletePostfromDB,
    getPostByIdandUser,
    selectPassword,
};
