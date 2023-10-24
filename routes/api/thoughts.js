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


router.post('/', async (req, res) => {
    try{

        const thought = await Thought.create(req.body);
        
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { runValidators: true, new: true }
        )

        if(!user) {
            res.status(404).json({ message: "No user with that ID" })
        }

        res.status(200).json(thought)

    }catch(err){
        res.status(500).json(err);
    }
})

router.put('/:thoughtID', async (req, res) => {
    try{
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtID },
            { $set: req.body },
            { runValidators: true, new: true }
        )

        if(!thought) {
            res.status(404).json({ message: "No thought with that ID" })
        }

        res.status(200).json(thought)
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.delete('/:thoughtID', async (req, res) => {
    try{
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtID });

        if(!thought) {
            res.status(404).json({ message: "No thought with that ID" })
        }

        res.status(200).json({ message: "Thought Successfully Deleted" })
    }
    catch(err){
        res.status(500).json(err);
    } 
})

module.exports = router;