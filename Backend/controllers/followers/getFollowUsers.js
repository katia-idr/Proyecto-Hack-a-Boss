const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const getFollowUsers = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idUser = req.userAuth.id;

        let followUsers;

        [followUsers] = await connection.query(
            `
        SELECT uf.id, uf.name, uf.username, uf.lastname, uf.avatar, uf.bio, uf.url
        FROM user u INNER JOIN follower fw
        ON u.id = fw.idUser INNER JOIN user uf
        ON fw.idFollower = uf.id
        WHERE u.id = ?
            `,
            [idUser]
        );

        if (followUsers.length === 0) {
            res.send({
                status: 'ok',
                message: `El usuario con id ${idUser} no sigue a ningún usuario`,
            });
        } else {
            res.send({
                status: 'ok',
                data: followUsers,
            });
        }
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getFollowUsers;
