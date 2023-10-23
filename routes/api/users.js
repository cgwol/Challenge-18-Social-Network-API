const router = require('express').Router();
const { User } = require('../../models/')

router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-__v');
        res.status(200).json(users)

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:userID', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userID }).select('-__v');

        if (!user) {
            res.status(404).json({ message: "No user with that ID" });
        }

        res.status(200).json(user);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:userID', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            { _id: req.params.userID },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!user) {
            res.status(404).json({ message: "No user with that ID" });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/:userID', async (req, res) => {
    try{
        const user = await User.findByIdAndDelete({ _id: req.params.userID });

        if (!user) {
            res.status(404).json({ message: "No user with that ID" });
        }

        res.status(200).json({ message: "User deleted successfully!" });

    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;