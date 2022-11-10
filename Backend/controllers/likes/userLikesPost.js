const { generateError } = require('../../helpers');

const {
    checkLikes,
    userLikes,
    userUnlikes,
    userLikesFirst,
    likesCounter,
} = require('../../repositories/likes-repositories');
const { getPostById } = require('../../repositories/post-repositories');

const userLikesPost = async (req, res, next) => {
    try {
        const userId = req.userAuth.id;

        const { postId } = req.params;

        const post = await getPostById(postId);

        if (post.length === 0) {
            throw generateError('El post al que quieres dar like no existe');
        }

        const checkLike = await checkLikes(postId, userId);

        if (checkLike.length === 0) {
            await userLikesFirst(postId, userId);

            const numLikes = await likesCounter(postId);

            res.send({
                status: 'ok',
                message: 'like insertado con exito!',
                data: { userId, postId, liked: true, numLikes },
            });
        } else if (checkLike[0].liked === 0) {
            await userLikes(postId, userId);

            const numLikes = await likesCounter(postId);

            res.send({
                status: 'ok',
                message: 'like insertado con exito!',
                data: { userId, postId, liked: true, numLikes },
            });
        } else {
            await userUnlikes(postId, userId);

            const numLikes = await likesCounter(postId);
            res.send({
                status: 'ok',
                message: 'like borrado con exito!',
                data: { userId, postId, liked: false, numLikes },
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = userLikesPost;
