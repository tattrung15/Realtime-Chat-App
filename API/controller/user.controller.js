const mongoose = require('mongoose');

const User = require('../../model/userModel');

module.exports.allUser = async (req, res) => {

    try {
        let data = await User.find();

        res.status(200).json({
            message: 'success',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: 'fail',
            error: error
        });
    }
};