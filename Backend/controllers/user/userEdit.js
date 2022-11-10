const getDB = require('../../db/getDB');
const { generateError, savePhoto } = require('../../helpers');
const bcrypt = require('bcrypt');

const userEdit = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idUser = req.userAuth.id;
        const {
            name,
            lastname,
            bio,
            url,
            privacy,
            oldPass,
            newPass,
            email,
            username,
        } = req.body;
        const avatar = req.files?.avatar;

        if (
            !(
                name ||
                lastname ||
                bio ||
                url ||
                avatar ||
                oldPass ||
                newPass ||
                email ||
                username ||
                privacy
            )
        ) {
            throw generateError('No has hecho ningún cambio.', 400);
        }

        const [[user]] = await connection.query(
            `select * from user where id = ?`,
            [idUser]
        );

        let userUrl;
        if (url) {
            if (!(url.includes('https://') || url.includes('http://'))) {
                userUrl = 'http://' + url;
            } else {
                userUrl = url;
            }
        }

        let hashedPassword = null;

        if (newPass && !oldPass) {
            throw generateError(
                'Necesitas introducir la contraseña anterior.',
                400
            );
        }

        if (oldPass) {
            if (!newPass) {
                throw generateError(
                    'Necesitas introducir la contraseña anterior y la nueva.',
                    400
                );
            }
            const isValid = await bcrypt.compare(oldPass, user.password);

            if (!isValid) {
                throw generateError(
                    'Contraseña incorrecta. Intenta de nuevo con la contraseña correcta.',
                    401
                );
            }
            hashedPassword = await bcrypt.hash(newPass, 10);
        }

        if (email) {
            const [[userWithSameEmail]] = await connection.query(
                `select id from user where email = ?`,
                [email]
            );
            if (userWithSameEmail) {
                throw generateError(
                    'Ya hay un usuario registrado con ese email.',
                    409
                );
            }
        }

        if (username) {
            const [[userWithSameUsername]] = await connection.query(
                `select id from user where username = ?`,
                [username]
            );
            if (userWithSameUsername) {
                throw generateError(
                    'Ya hay un usuario registrado con ese nombre de usuario. Por favor elige otro.',
                    409
                );
            }
        }

        let avatarName = null;
        if (avatar) {
            avatarName = await savePhoto(avatar, 0);
        }

        await connection.query(
            `
         update user set name = ?, lastname = ?, bio = ?, url = ?, privacy = ?, avatar = ?, password = ?, email = ?, username = ? where id = ?`,
            [
                name || user.name,
                lastname || user.lastname,
                bio || user.bio,
                userUrl || user.url,
                privacy || user.privacy,
                avatarName || user.avatar,
                hashedPassword || user.password,
                email || user.email,
                username || user.username,
                idUser,
            ]
        );

        res.send({
            status: 'Ok',
            message:
                'Los datos de tu cuenta en Hack a Gram han sido modificados con éxito.',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = userEdit;
