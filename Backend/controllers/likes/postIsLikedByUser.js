const getDB = require('../../db/getDB');

const postIsLikedByUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idUser = req.userAuth.id;

        const { postId } = req.params;

        const [postIsLiked] = await connection.query(
            `
        SELECT liked FROM likes WHERE idUser=? AND idPost =?
            `,
            [idUser, postId]
        );

        if (postIsLiked.length === 0 || postIsLiked[0].liked === 0) {
            res.send({
                status: 'ok',
                data: false,
            });
        } else {
            res.send({
                status: 'ok',
                data: true,
            });
        }
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = postIsLikedByUser;
