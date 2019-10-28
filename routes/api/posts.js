const express = require('express')
const router = express.Router();

// @route POST api/users
// @desc User routes
// @access Public

router.get('/', (req,res) => res.send('Post route'));

module.exports = router;
