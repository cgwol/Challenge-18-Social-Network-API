const router = require('express').Router();

router.get('/hello', async (req,res) => {
    
    try{
        res.send('HELLO!').status(200)
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;