const bcrypt = require('bcrypt');

const { deletePhoto, generateError } = require('../../helpers');
const {
    postPhotos,
    deletePhotofromDB,
    deletePostfromDB,
    getPostByIdandUser,
    selectPassword,
} = require('../../repositories/post-repositories');

const deletePost = async (req, res, next) => {
    try {
        const idUser = req.userAuth.id;

        const { idPost } = req.params;

        const post = await getPostByIdandUser(idPost, idUser);

        if (post.length === 0) {
            throw generateError(
                'No eres el propietario del post a eliminar o el post no existe'
            );
        }

        const photos = await postPhotos(idPost);

        for (let i = 0; i < photos.length; i++) {
            await deletePhoto(photos[i].name, 1);
        }

        await deletePhotofromDB(idPost);

        await deletePostfromDB(idPost);

        res.send({
            status: 'ok',
            message: `Post con id ${idPost} eliminado con éxito!`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deletePost;
