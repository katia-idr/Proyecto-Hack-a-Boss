const {
    checkFollower,
    unselectFollower,
    selectFollower,
} = require('../../repositories/followers-repositories');

const selectFollowerUser = async (req, res, next) => {
    try {
        const userId = req.userAuth.id;

        const { followerId } = req.params;

        const checkFollow = await checkFollower(followerId, userId);

        if (checkFollow.length === 0) {
            await selectFollower(followerId, userId);

            res.send({
                status: 'ok',
                message: 'Has empezado a seguir a este usuario!',
                data: { userId, followerId, follow: true },
            });
        } else {
            await unselectFollower(followerId, userId);
            res.send({
                status: 'ok',
                message: 'Se ha eliminado este usuario de tus seguidos!',
                data: { userId, followerId, follow: false },
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = selectFollowerUser;
