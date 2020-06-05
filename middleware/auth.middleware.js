const User = require('../model/userModel');

module.exports.authLogin = async (req, res, next) => {

    if(!req.signedCookies.userId){
        res.redirect('/auth/login');
        return;
    }

    let userSearch = await User.findOne({ username: req.signedCookies.userId });

    if(!userSearch){
        res.redirect('/auth/login');
        return;
    }

    res.locals.user = userSearch;

    next();

};

module.exports.auth = async (req, res, next) => {

    if(!req.signedCookies.userId){
        next();
        return;
    }

    let userSearch = await User.findOne({ username: req.signedCookies.userId });

    if(!userSearch){
        next();
        return;
    }

    res.render('chat/chat', {
        user: {
            fullname: userSearch.fullname,
            username: userSearch.username
        }
    });
};