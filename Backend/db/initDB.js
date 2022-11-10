const getDB = require('./getDB');
const bcrypt = require('bcrypt');

async function main() {
    let connection;

    try {
        connection = await getDB();

        console.log('Eliminando tablas...');

        await connection.query('DROP TABLE IF EXISTS comment');
        await connection.query('DROP TABLE IF EXISTS favorite');
        await connection.query('DROP TABLE IF EXISTS likes');
        await connection.query('DROP TABLE IF EXISTS photo');
        await connection.query('DROP TABLE IF EXISTS post');
        await connection.query('DROP TABLE IF EXISTS follower');
        await connection.query('DROP TABLE IF EXISTS user');

        console.log('Tablas eliminadas!');

        console.log('Creando tablas...');

        await connection.query(`
        CREATE TABLE IF NOT EXISTS user (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(50) NOT NULL,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL,
            password VARCHAR(200) NOT NULL,
            lastname VARCHAR(100),
            avatar VARCHAR(255),
            bio VARCHAR(500),
            url VARCHAR(255),
            privacy ENUM ('private', 'public') DEFAULT 'public',
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
                `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS follower (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                idUser INT UNSIGNED NOT NULL,
                    FOREIGN KEY (idUser) REFERENCES user (id)
                    ON DELETE CASCADE,
                idFollower INT UNSIGNED NOT NULL,
                    FOREIGN KEY (idFollower) REFERENCES user (id)
                    ON DELETE CASCADE
                )
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS post (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            authorComment VARCHAR(500) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            hashtag VARCHAR (255),
            idUser INT UNSIGNED NOT NULL,
                FOREIGN KEY (idUser) REFERENCES user (id)
                ON DELETE CASCADE
            )
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS photo (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR (255),
            idPost INT UNSIGNED NOT NULL,
                FOREIGN KEY (idPost) REFERENCES post (id)
                ON DELETE CASCADE
            )
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS likes (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            idPost INT UNSIGNED NOT NULL,
            liked  TINYINT DEFAULT 0,
            FOREIGN KEY (idPost) REFERENCES post (id)
            ON DELETE CASCADE,
            idUser INT UNSIGNED NOT NULL,
                FOREIGN KEY (idUser) REFERENCES user (id)
                ON DELETE CASCADE)
        `);

        await connection.query(`
      CREATE TABLE IF NOT EXISTS favorite (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            idPost INT UNSIGNED NOT NULL,
                FOREIGN KEY (idPost) REFERENCES post (id)
                ON DELETE CASCADE,
            idUser INT UNSIGNED NOT NULL,
                FOREIGN KEY (idUser) REFERENCES user (id)
                ON DELETE CASCADE
            );
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS comment (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            body VARCHAR (500) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            idPost INT UNSIGNED NOT NULL,
                FOREIGN KEY (idPost) REFERENCES post (id)
                ON DELETE CASCADE,
            idUser INT UNSIGNED NOT NULL,
                FOREIGN KEY (idUser) REFERENCES user (id)
                ON DELETE CASCADE
            )
        `);

        console.log('Tablas creadas!');

        const passUser = await bcrypt.hash('12345', 10);

        await connection.query(
            `INSERT INTO user (name, username, email, password, lastname, avatar, bio, url, privacy, createdAt)
      VALUES ("Pablo", "Pablito", "pablo@gmail.com", ?, "López", null, "Me encanta dibujar", "http://www.domestika.com", "public", "2022-08-10" ),
      ("Ana Belén", "Anita", "anabelen@gmail.com", ?, "Martínez", null, "Soy maestra de yoga", "http://www.yogawithadriene.com", "public", "2022-08-11" ),
      ("Hans", "Hans33", "hans@gmail.com", ?, "Pullman", null, "Amo viajar", null, "public", "2022-08-16" ),
      ("Arturo", "Arturito", "arturo@gmail.com", ?, "Fernández", null, "Mi lugar está en la cocina", null, "private", "2022-08-10" ),
      ("Lucía", "luchi", "lucia@gmail.com", ?, "Pérez", null, "Las plantas son vida.", null, "private", "2022-08-22" ),
      ("Pedro", "P3dr0", "pedro@gmail.com", ?, "Páramo", null, "Me encantan los coches. Fan de Ferrari, tifosi por siempre", null, "public", "2022-08-18" ),
      ("María", "loshilosdeMaria", "maria@gmail.com", ?, "Campos", null, "Me encanta tejer y bordar.", null, "public", "2022-08-28" ),
      ("Karla", "karlamoda", "karla@gmail.com", ?, "Cruz", null, "Siempre sé que ponerme.", null, "private", "2022-08-29" ),
      ("Matías", "scubaman", "matias@gmail.com", ?, "Bouvy", null, "Nos vemos bajo el agua.", null, "public", "2022-08-05" )
      `,
            [
                passUser,
                passUser,
                passUser,
                passUser,
                passUser,
                passUser,
                passUser,
                passUser,
                passUser,
            ]
        );
        console.log('Usuarios insertados');

        await connection.query(
            `INSERT INTO follower (idUser, idFollower)
                VALUES (1,2), (1,3), (1,5), (1,7), (1,9), (2,1), (2,4), (2,5), (2,6), (2,7), (3,1), (3,2), (3,4), (3,5), (3,6), (3,7), (3,8), (3,9), (4,9), (5,1), (5,2), (5,3), (5,7), (5,9), (6,2), (6,4), (6,8), (7,1), (7,3), (7,5), (7,7), (8,1),(8,2), (8,5), (8,6), (9,3), (9,4), (9,7),(9,8)`
        );

        console.log('Followers insertados');

        await connection.query(
            `INSERT INTO post (authorComment, createdAt, hashtag, idUser)
                VALUES ("Mis herramientas de trabajo", "2022-09-01", "color, rojo, aventura", 1),
                ("Un dibujo de mi animal favorito", "2022-09-02", "jirafa, aventura, naturaleza, dibujo, arte", 1),
                ("Currando un rato", "2022-09-04", "negro, trabajo, pluma, dibujo", 1),
                ("Siempre me ha gustado dibujar", "2022-09-06", "infancia, familia, recuerdos, jardin", 1),
                ("Mi tía me hizo estas calcetas especiales para yoga", "2022-09-01", "crochet, azul, yoga, familia", 2),
                ("Practicando un poco", "2022-09-02", "aventura, comida, rojo, naturaleza, salud", 2),
                ("Meditar es mi desayuno", "2022-09-03", "yoga, desayuno", 2),
                ("No hay mejor lugar que el mar", "2022-09-04", "aventura, yoga, playa, paisaje", 2),
                ("En el mar la vida es más sabrosa", "2022-09-10", "playa, paisaje, mar", 3),
                ("Listo para mi siguiente aventura", "2022-09-11", "aventura, viajes, ciudad", 3),
                ("¿Viajar para hacer ejercicio? ¡Claro que si!", "2022-09-12", "paisaje, verde, viajes, salud", 3),
                ("San Francisco", "2022-09-13", "rojo, ciudad, viajes", 3),
                ("El postre es la mejor parte de la comida", "2022-09-10", "rojo, comida, chef, postre", 4),
                ("Trabajando con el mejor equipo", "2022-09-11", "cocina, equipo, chef, comida", 4),
                ("Hoy tenemos un evento privado en un lugar mágico", "2022-09-12", "aventura, bosque, naturaleza", 4),
                ("El 1, 2 y 3 de una cena deliciosa", "2022-09-13", "rojo, comida, chef, ", 4),
                ("Mi amiga la yogui vino de visita", "2022-09-14", "verde, yoga, plantas", 5),
                ("Otra visita", "2022-09-15", "plantas, rojo, ardilla, animales, naturaleza", 5),
                ("Recién cortada de mi jardín", "2022-09-17", "flor, amarillo, jardín", 5),
                ("Que hermoso lugar", "2022-09-18", "rosa, jardín, plantas", 5),
                ("El mejor de España.", "2022-09-10", "Alonso, España, f1, coches", 6),
                ("Me urge tener esta t-shirt", "2022-09-11", "coches, f1, Sainz", 6),
                ("¡Se necesitan 4 llantas amigos de Ferrari, 4!", "2022-09-12", "rojo, f1, coches", 6),
                ("Tifosi por siempre, aunque duela", "2022-09-13", "amarillo, f1, coches", 6),
                ("El mejor por siempre.", "2022-09-14", "f1, coches", 6),
                ("Paz en Ucrania", "2022-09-15", "azul, amarillo, Ucrania, crochet", 7),
                ("Yarn bombing", "2022-09-16", "arbol, crochet, naturaleza, color", 7),
                ("Haciendo un pedido especial para una maestra de yoga", "2022-09-17", "azul yoga, crochet, deportes", 7),
                ("Una pequeña muestra de mi gran colección. Comprar hilazas es casi tan divertido como tejer.", "2022-09-18", "arcoiris, hilazas, azul, rojo, amarillo, verde", 7),
                ("No hay mejor forma de disfrutar la playa en invierno que tejiendo", "2022-09-19", "playa, naturaleza, crochet", 7),
                ("Los tenis siempre son la elección correcta", "2022-09-17", "rojo, tennis, outfit", 8),
                ("Me encanta este vestido", "2022-09-18", "amarillo", 8),
                ("El conjunto ideal para la playa sin perder el estilo", "2022-09-19", "playa, outfit", 8),
                ("Nos vemos bajo el agua", "2022-09-10", "azul, buceo", 9),
                ("Una amiga", "2022-09-11", "azul, rosa, naturaleza, animales", 9),
                ("Estrenando mi neopreno nuevo", "2022-09-12", "azul, buceo, rojo, aletas", 9),
                ("Recuerdos es lo único que debes llevarte cuando buceas", "2022-09-13", "animales, tortuga, playa", 9)
                `
        );

        console.log(' Tabla post insertados');

        await connection.query(
            `INSERT INTO photo (name, idPost)
                VALUES ("post1.jpg", 1), ("post1-2.jpg", 1), ("post2.jpg", 2), ("post3.jpg", 3), ("post4.jpg", 4), ("post5.jpeg", 5), ("post6.png", 6), ("post6-2.jpg", 6), ("post7.jpg", 7), ("post8.jpg", 8), ("post9.jpg", 9), ("post10.jpg", 10), ("post11.jpg", 11), ("post12.jpg", 12), ("post13.jpg", 13), ("post14.jpg", 14), ("post15.jpg", 15), ("post16-1.jpg", 16), ("post16-2.jpg", 16), ("post16-3.jpg", 16), ("post17.jpg", 17), ("post18.jpg", 18), ("post19.jpg", 19), ("post20.jpg", 20),
                ("post21.jpeg", 21), ("post22.jpeg", 22), ("post23.jpeg", 23), ("post24.jpeg", 24), ("post25-1.jpeg", 25), ("post25-2.jpeg", 25), ("post26.jpg", 26), ("post27-1.jpeg", 27), ("post27-2.jpeg", 27), ("post27-3.jpeg", 27), ("post27-4.jpeg", 27), ("post27-5.jpeg", 27), ("post28.jpeg", 28), ("post29.jpg", 29), ("post30.jpeg", 30), ("post31.jpg", 31), ("post32.jpg", 32), ("post33.jpg", 33), ("post34.jpg", 34), ("post35.jpg", 35), ("post36.jpg", 36), ("post37.jpg", 37)
                `
        );

        console.log('Photos insertadas');

        await connection.query(
            `INSERT INTO likes (idPost, liked, idUser)
                VALUES (10, 1, 1), (10, 1, 4), (10, 1, 7), (32, 1, 1),(32, 1, 5),  (16, 1, 1), (16, 1, 4),  (13, 1, 1), (13, 1, 2),  (36, 1, 2), (33, 1, 2), (21, 1, 2),(21, 1, 3), (8, 1, 2), (24, 1, 2), (24, 1, 4), (1, 1, 3), (22, 1, 3), (22, 1, 5), (4, 1, 3), (4, 1, 4), (4, 1, 5), (4, 1, 9), (14, 1, 3), (14, 1, 6), (14, 1, 7), (14, 1, 8), (30, 1, 3), (30, 1, 1), (30, 1, 2), (25, 1, 3), (25, 1, 9), (25, 1, 8), (37, 1, 4), (37, 1, 2), (37, 1, 7), (31, 1, 4), (9, 1, 4), (9, 1, 5), (9, 1, 2), (9, 1, 1), (9, 1, 3), (9, 1, 4), (9, 1, 5), (9, 1, 6), (9, 1, 7), (9, 1, 8), (9, 1, 9), (9, 1, 9), (18, 1, 4), (18, 1, 5), (18, 1, 7), (23, 1, 5), (34, 1, 5), (5, 1, 5), (3, 1, 6), (12, 1, 6), (11, 1, 7), (11, 1, 6), (11, 1, 5),  (11, 1, 4), (6, 1, 7), (7, 1, 7), (15, 1, 7),(20, 1, 7), (35, 1, 7), (17, 1, 8), (17, 1, 3), (29, 1, 8), (27, 1, 8), (27, 1, 1), (26, 1, 9), (28, 1, 9), (2, 1, 9)`
        );

        console.log('Likes insertados');

        await connection.query(
            `INSERT INTO comment (body, createdAt, idPost, idUser)
                VALUES ("Que bonitos colores", "2022-09-20", 1, 4),
                ("¡Me encanta dibujar!", "2022-09-21", 1, 8),
                ("Mi animal favorito es la jirafa", "2022-09-20", 2, 8),
                ("¡Que lindo recuerdo!", "2022-09-21", 4, 7),
                ("A mi también me gustaba colorear cuando era peque", "2022-09-22", 4, 9),
                ("Que rizos más chulos", "2022-09-23", 4, 2),
                ("Que lindos calcetines!Y qué prácticos!", "2022-09-20", 5, 9),
                ("Son igual que los mios!", "2022-09-21", 5, 3),
                ("Yo también quiero estar ahí!", "2022-09-20", 8, 7),
                ("Justo ayer hice yoga en la playa", "2022-09-21", 8, 1), ("Qué vistas más bonitas", "2022-09-20", 11, 2),("Qué delicia!", "2022-09-21", 14, 7),("Guárdame un plato para esta noche!", "2022-09-23", 14, 6),("Qué linda flor!", "2022-09-20", 19, 2), ("Quiero que me regalen una!", "2022-09-22", 19, 4),("Qué mala temporada lleva Ferrari este año!", "2022-09-20", 24, 2),
                ("Paz en Ucrania", "2022-09-22", 26, 6), ("Paz en Ucrania", "2022-09-23", 26, 2),("Qué guay! En mi ciudad también lo hicieron", "2022-09-20", 27, 4),("Qué combinación de ropa más chula", "2022-09-20", 31, 1),("Qué bonito es el fondo del mar", "2022-09-20", 34, 6),("Invitame a aprender", "2022-09-20", 36, 4)
                `
        );

        console.log('Comments insertados');

        await connection.query(
            `INSERT INTO favorite (idPost, idUser)
                VALUES (1,1), (10,9), (19,1), (2,2), (23,2), (33,2), (11,3), (28,3), (4,4), (29,4), (13,5), (27,5), (17,6), (32,6), (6,7), (30,7), (35,7), (15,8), (31,8), (8,9), (26,9)`
        );

        console.log('Favorites insertados');
    } catch (error) {
        console.error(error.message);
    } finally {
        if (connection) connection.release();

        process.exit();
    }
}

main();
