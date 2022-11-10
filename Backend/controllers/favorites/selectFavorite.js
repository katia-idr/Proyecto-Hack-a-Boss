const {
    checkFavorites,
    deleteFavoritePost,
    insertFavoritePost,
} = require('../../repositories/favorites-repositories');

const selectFavorite = async (req, res, next) => {
    try {
        const userId = req.userAuth.id;

        const { postId } = req.params;

        const checkFavorite = await checkFavorites(postId, userId);

        if (checkFavorite.length === 0) {
            await insertFavoritePost(postId, userId);

            res.send({
                status: 'ok',
                message: 'Favorito añadido con exito!',
                data: { userId, postId, favorite: true },
            });
        } else {
            await deleteFavoritePost(postId, userId);
            res.send({
                status: 'ok',
                message: 'Se ha eliminado este post de tus favoritos!',
                data: { userId, postId, favorite: false },
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = selectFavorite;
