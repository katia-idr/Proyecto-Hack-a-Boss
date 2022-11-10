require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');

//Variable servidor
const port = process.env.SERVER_PORT;

//Creamos el servidor
const app = express();

//Configuramos cors
app.use(
    cors({
        origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    })
);

//Deserializamos el body en formato raw para poder leer los datos
app.use(express.json());

//Leemos los archivos estáticos
app.use(express.static('static'));

// Middleware de Morgan que dará más información de las peticiones al servidor
app.use(morgan('dev'));

// Middleware que permite al servidor leer los archivos en formato form-data
app.use(fileUpload());

////////MIDDLEWARES////////
const tokenMatches = require('./middlewares/tokenMatches');

////////USER CONTROLLERS////////

const userNew = require('./controllers/user/userNew');
const userLogin = require('./controllers/user/userLogin');
const userDelete = require('./controllers/user/userDelete');
const userEdit = require('./controllers/user/userEdit');
const userProfile = require('./controllers/user/userProfile');

////////POST CONTROLLERS////////

const getPost = require('./controllers/posts/getPost');
const getPosts = require('./controllers/posts/getPosts');
const newPost = require('./controllers/posts/newPost');
const deletePost = require('./controllers/posts/deletePost');

////////PHOTOS CONTROLLERS////////

////////COMMENTS CONTROLLERS////////
const newComent = require('./controllers/comment/newComent');

////////FOLLOWERS CONTROLLERS////////
const getFollowUsers = require('./controllers/followers/getFollowUsers');

////////LIKES CONTROLLERS////////
const userLikesPost = require('./controllers/likes/userLikesPost');
const postIsLikedByUser = require('./controllers/likes/postIsLikedByUser');

////////FAVORITES CONTROLLERS////////
const getFavorites = require('./controllers/favorites/getFavorites');
const selectFavorite = require('./controllers/favorites/selectFavorite');
const selectFollowerUser = require('./controllers/followers/selectFollower');

////////ENDPOINTS USERS////////
// Registra un usuario
app.post('/register', userNew);
// Login de usuario
app.post('/login', userLogin);
// Mostrar perfil de usuario
app.get('/user/:idUser', userProfile);

// Modifica datos del usuario (name, lastname, bio, url, privacy, email, username, avatar)
app.put('/user/data', tokenMatches, userEdit);

// Eliminar al usuario
app.delete('/user/:idUser/delete', tokenMatches, userDelete);

////////ENDPOINTS POST////////
// Nuevo post (fotos, comentario autor, hastags)
app.post('/posts/new', tokenMatches, newPost);
// Lista todos los post
app.get('/posts', getPosts);
// Lista un post
app.get('/posts/:idPost', getPost);
// Eliminar un post
app.delete('/posts/:idPost', tokenMatches, deletePost);

////////ENDPOINTS COMMENTS////////
// Nuevo comentario
app.post('/comments/new/:idPost', tokenMatches, newComent);

////////ENDPOINTS FOLLOWERS////////
// Recupera datos de un follower
app.get('/follower', tokenMatches, getFollowUsers);
// Añade o quita un follower
app.post('/user/:followerId/follower', tokenMatches, selectFollowerUser);

////////ENDPOINTS LIKES////////
// Añade y elimina likes
app.post('/post/:postId/like', tokenMatches, userLikesPost);
//Nos dice si un post esta dado like o no o por un usuario
app.get('/post/:postId/isLiked', tokenMatches, postIsLikedByUser);

////////ENDPOINTS FAVORITES////////
// Recupera favoritos
app.get('/favorites', tokenMatches, getFavorites);
// Añade o quita de favoritos
app.post('/post/:postId/favorite', tokenMatches, selectFavorite);

// Middleware de ERROR
app.use((error, req, res, next) => {
    console.error(error);

    // Asignamos el codigo del error->creaMOS una propiedad httpStatus en los endpoint donde asignaMOS el codigo correspondiente, si no existe daremos el 500
    res.status(error.httpStatus || 500);

    // Enviamos la respuesta con el error
    res.send({
        status: 'Error',
        message: error.message,
    });
});

// Middleware de NOT FOUND - Rutas que no encuentre
app.use((req, res) => {
    res.status(404);

    res.send({
        status: 'Error',
        message: 'Not found',
    });
});

// Ponemos el servidor a la escucha en el puerto 4000
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
