const bcrypt = require('bcrypt');
const getDB = require('../../db/getDB');
const { generateError, deletePhoto } = require('../../helpers');

const userDelete = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();
        const { idUser } = req.params;
        const { password } = req.body;

        if (!password) {
            throw generateError(
                'Debes indicar tu password para poder borrar tu cuenta.',
                400
            );
        }

        const [user] = await connection.query(
            `select password from user where id = ?`,
            [idUser]
        );

        const isValid = await bcrypt.compare(password, user[0].password);

        if (!isValid) {
            throw generateError(
                'La contraseña es incorrecta. No estás autorizado para eliminar esta cuenta.',
                401
            );
        }

        if (user[0].avatar) {
            await deletePhoto(user[0].avatar, 0);
        }

        await connection.query(`delete from user where id =?`, [idUser]);

        res.send({
            status: 'Ok',
            message: 'El usuario ha sido eliminado. ¡Adiós!.',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release;
    }
};

module.exports = userDelete;
