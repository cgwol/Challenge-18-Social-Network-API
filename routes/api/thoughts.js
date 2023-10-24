const router = require('express').Router()
const { User, Thought } = require('../../models/');

router.get('/', async (req, res) => {
    try{
        const thoughts = await Thought.find().select('-__v');
        res.status(200).json(thoughts)
    }catch(err){
        res.status(500).json(err);
    }
})

router.get('/:thoughtID', async (req, res) => {
    try{
        const thought = await Thought.findOne({ _id: req.params.thoughtID }).select('-__v');

        if (!thought) {
            res.status(404).json({ message: "No thought with that ID" });
        }

        res.status(200).json(thought)
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;