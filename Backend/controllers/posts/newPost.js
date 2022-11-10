const { validate, generateError } = require('../../helpers');
const { newPostSchema } = require('../../schemas/newPostSchema');
const {
    createPost,
    insertPhoto,
    insertLike,
} = require('../../repositories/post-repositories');

const newPost = async (req, res, next) => {
    try {
        await validate(newPostSchema, req.body);

        const { authorComment, hashtag } = req.body;

        if (hashtag && hashtag.split(',').length > 10) {
            throw generateError('No puedes incluir más de 10 hashtags', 400);
        }

        if (!(req.files && req.files.post_photo)) {
            throw generateError('Tienes que subir al menos una imagen', 400);
        }

        if (req.files.post_photo.length > 5) {
            throw generateError('No puedes subir más de 5 fotografías', 400);
        }

        const idUser = req.userAuth.id;

        const postId = await createPost(authorComment, hashtag, idUser);

        let postPhotos;

        if (Array.isArray(req.files.post_photo)) {
            postPhotos = req.files.post_photo;
        } else {
            postPhotos = [req.files.post_photo];
        }

        const photosNames = await insertPhoto(postPhotos, postId);

        await insertLike(postId, idUser);

        res.send({
            status: 'Ok',
            message: 'Post creado con éxito!',
            data: {
                id: postId,
                authorComment,
                hashtag,
                photosNames,
                liked: false,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newPost;
