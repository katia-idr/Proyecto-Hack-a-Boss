const { generateError } = require('../../helpers');
const getDB = require('../../db/getDB');
const {
    createComent,
    selectCommentById,
} = require('../../repositories/comment-repositories');

const newComent = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { body } = req.body;
        if (!body) {
            throw generateError('No has introducido ningún comentario', 400);
        }

        const { idPost } = req.params;

        const userId = req.userAuth.id;

        const commentId = await createComent(body, idPost, userId);

        const comment = await selectCommentById(commentId);

        res.send({
            status: 'Ok',
            message: 'Comment creado con éxito!',
            data: comment,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newComent;
