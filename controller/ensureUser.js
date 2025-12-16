import db from '../models/index.js';
const User = db.user;

const ensureUser = async (req, res, next) => {
    if (!req.oidc.isAuthenticated()) {
        return next();
    }

    const {sub, email, name, photo} = req.oidc.user || {};

    if (!sub) {
        return next();
    }

    let user = await User.findOne({ auth0Id: sub });

    if (!user) {
        user = await User.create({
            auth0Id: sub,
            email: email,
            name: name,
            photo: photo
        });
    }

    req.user = user;

    next();
}

export {ensureUser};