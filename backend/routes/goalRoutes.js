const router = require('express').Router();
const {getGoals,setGoal,updateGoal,deleteGoal} = require('../controllers/goalController');

router.route('/').get(getGoals).post(setGoal);
router.route('/:id').put(updateGoal).delete(deleteGoal);

module.exports = router;