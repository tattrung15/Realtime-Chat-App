const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    res.render('chat/chat', {
        user: {
            fullname: res.locals.user.fullname,
            username: res.locals.user.username
        }
    });
});

module.exports = router;