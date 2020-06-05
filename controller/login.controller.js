const bcrypt = require('bcrypt');

const User = require('../model/userModel');

module.exports.login = (req, res) => {
    res.render('auth/login');
};

module.exports.logout = (req, res) => {
    res.clearCookie('userId');
    res.render('auth/login');
};

module.exports.postLogin = async (req, res) => {
    try {
        
        let userLogin = req.body;
        let userSearch = await User.findOne({ username: req.body.username});
        
        if(!userSearch){
            res.render('auth/login', {
                errors: [
                    'User does not exist.'
                ],
                value: userLogin
            });
            return;
        }

        if(!bcrypt.compareSync(userLogin.password, userSearch.password)){
            res.render('auth/login', {
                errors: [
                    'Wrong password.'
                ],
                value: userLogin
            });
            return;
        }

        res.cookie('userId', userSearch.username, {
            signed: true
        });

        res.render('chat/chat', {
            user: {
                fullname: userSearch.fullname,
                username: userSearch.username
            }
        });

    } catch (error) {
        res.render('auth/login', {
            errors: [
                'Error: Something wrong.'
            ]
        });
    }
};