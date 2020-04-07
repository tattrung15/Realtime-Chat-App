const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const User = require('../model/userModel');

module.exports.signup = (req, res) => {
    res.render('signup/signup');
};

module.exports.postSignup = async (req, res) => {
    try {

        let oldUser = await User.findOne({ username: req.body.username });
        let newUser = req.body;
        let newUserPass = req.body.password;
        
        if(oldUser){
            res.render('signup/signup', {
                newUser: req.body,
                msgCheck: 'Username already exist.'
            });
            return;
        } else {
            
            newUser.password = bcrypt.hashSync(newUser.password, salt);
            await User.create(newUser);
            
            res.render('auth/login', {
                newUser: newUser,
                newUserPass: newUserPass,
                msgSuccess: 'Registered successfully, please login...!'
            });
            return;
        }

    } catch (error) {
        res.render('signup/signup', {
            newUser: req.body,
            message: 'Error: Something wrong.'
        });
    }
}