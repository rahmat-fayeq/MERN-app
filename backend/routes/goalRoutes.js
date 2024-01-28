const router = require('express').Router();

router.get('/', (req,res)=>{
    res.status(200).json({message:'success'});
});
router.post('/', (req,res)=>{
    res.status(201).json({message:'success'});
});
router.put('/:id', (req,res)=>{
    res.status(200).json({message: `${req.params.id}`});
});
router.delete('/:id', (req,res)=>{
    res.status(200).json({message: `${req.params.id}`});
});

module.exports = router;