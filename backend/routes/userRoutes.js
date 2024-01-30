const router = require('express').Router();
const {registerUser,getMe,loginUser} = require('../controllers/userController');

router.post('/',registerUser);
router.post('/login',loginUser);
router.get('/me',getMe);


module.exports = router;