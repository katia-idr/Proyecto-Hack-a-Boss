const { generateError } = require('../../helpers');
const { likesCounter } = require('../../repositories/likes-repositories');

const {
    getPublicPostsBySearch,
    getPublicPostsByOrderDirection,
    getPostsBySearch,
    getPostsByOrderDirection,
    postPhotos,
    postComments,
} = require('../../repositories/post-repositories');

const getPosts = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        const { search } = req.query;

        let posts;
        if (!token) {
            if (search) {
                posts = await getPublicPostsBySearch(search);
            } else {
                posts = await getPublicPostsByOrderDirection();
            }
        } else {
            if (search) {
                posts = await getPostsBySearch(search);
            } else {
                posts = await getPostsByOrderDirection();
            }
        }

        if (posts.length === 0) {
            throw generateError(
                'No hay ningun post relacionado con ese término que estás buscando'
            );
        }

        const postsInfo = [];

        for (let i = 0; i < posts.length; i++) {
            const photos = await postPhotos(posts[i].idPost);

            const comments = await postComments(posts[i].idPost);

            const likes = await likesCounter(posts[i].idPost);

            postsInfo.push({ ...posts[i], photos, comments, likes });
        }

        res.send({
            status: 'ok',
            data: postsInfo,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getPosts;
