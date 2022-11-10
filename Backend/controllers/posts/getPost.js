const { generateError } = require('../../helpers');
const { likesCounter } = require('../../repositories/likes-repositories');
const {
    getPostById,
    postPhotos,
    postComments,
} = require('../../repositories/post-repositories');

const getPost = async (req, res, next) => {
    try {
        const { idPost } = req.params;

        let post;
        post = await getPostById(idPost);

        if (post.length < 1) {
            throw generateError('El post seleccionado no existe', 404);
        }

        const photos = await postPhotos(idPost);

        const comments = await postComments(idPost);

        const likes = await likesCounter(idPost);

        const postInfo = [];

        postInfo.push(...post, photos, comments, likes);

        res.send({ status: 'ok', data: postInfo });
    } catch (error) {
        next(error);
    }
};

module.exports = getPost;
