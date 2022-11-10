const getDB = require('../../db/getDB');
const { likesCounter } = require('../../repositories/likes-repositories');
const {
    postComments,
    postPhotos,
} = require('../../repositories/post-repositories');

const getFavorites = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idUser = req.userAuth.id;

        const { search } = req.query;

        let favorites;

        if (search) {
            [favorites] = await connection.query(
                `
        SELECT p.authorComment, p.hashtag, p.idUser as idPostOwner, f.idPost, f.idUser FROM post p INNER JOIN favorite f ON p.id = f.idPost WHERE (f.idUser= ?) AND (p.authorComment LIKE ? OR p.hashtag LIKE ?)
        ORDER BY p.createdAt DESC `,
                [idUser, `%${search}%`, `%${search}%`]
            );
        } else {
            [favorites] = await connection.query(
                `
        SELECT p.authorComment, p.hashtag, p.idUser as idPostOwner, f.idPost, f.idUser FROM post p INNER JOIN favorite f ON p.id = f.idPost WHERE f.idUser=?
        ORDER BY p.createdAt DESC `,
                [idUser]
            );
        }

        if (favorites.length < 1) {
            res.send({
                status: 'ok',
                message: `No hay ningun post favorito asociado al usuario con id ${idUser}`,
            });
        } else {
            const favoritesList = [];

            for (let i = 0; i < favorites.length; i++) {
                const [postOwnerInfo] = await connection.query(
                    `SELECT name, username, lastname, privacy, avatar FROM user
                WHERE id = ?`,
                    [favorites[i].idPostOwner]
                );

                const photos = await postPhotos(favorites[i].idPost);

                const comments = await postComments(favorites[i].idPost);

                const likes = await likesCounter(favorites[i].idPost);

                //añadimos los datos recuperados al array favoritesList
                favoritesList.push({
                    ...favorites[i],
                    name: postOwnerInfo[0].name,
                    lastname: postOwnerInfo[0].lastname,
                    username: postOwnerInfo[0].username,
                    avatar: postOwnerInfo[0].avatar,
                    privacy: postOwnerInfo[0].privacy,
                    comments: comments,
                    photos: photos,
                    likes: likes,
                });
            }

            res.send({
                status: 'ok',
                data: favoritesList,
            });
        }
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getFavorites;
