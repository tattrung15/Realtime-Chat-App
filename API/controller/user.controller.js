require('dotenv').config();
const User = require('../../model/userModel');

module.exports.allUser = async (req, res) => {

    try {
        let key = req.body.name;

        if(!key){
            res.status(500).json({
                message: 'Unauthorization'
            });
            return;
        } else {
            if(key === process.env.KEY){
                let data = await User.find();

                res.status(200).json({
                    message: 'success',
                    data: data
                });
            } else {
                res.status(500).json({
                    message: 'Unauthorization'
                });
                return;
            }
        }
    } catch (error) {
        res.status(500).json({
            message: 'fail',
            error: error
        });
    }
};