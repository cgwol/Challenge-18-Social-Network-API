const connection = require('../config/connection');
const mongoose = require('mongoose');
const { User, Thought, Reaction } = require('../models');

connection.once('open', async () => {
    try {
        console.log('connected');

        await User.deleteMany({});
        await Thought.deleteMany({});

        const user1 = await User.create({
            username: 'lernantino',
            email: 'lernantino@gmail.com',
        });

        const user2 = await User.create({
            username: 'cgwol',
            email: 'cgwalterson@icloud.com',
        });

        const user3 = await User.create({
            username: 'user3',
            email: 'user3@email.com',
        });

        user1.friends.push(user2._id);
        user2.friends.push(user1._id);
        await user1.save();
        await user2.save();
        await user3.save();

        const thought1 = await Thought.create({
            thoughtText: "Here's a cool thought...",
            username: 'lernantino',
            reactions: [
                {
                    reactionBody: 'Great thought!',
                    username: 'cgwol',
                },
            ],
        });

        const thought2 = await Thought.create({
            thoughtText: "Hmmmmmmm . . .",
            username: 'cgwol',
            reactions: [
                {
                    reactionBody: 'Hmm',
                    username: 'user3',
                },
                {
                    reactionBody: 'Thats what I was thinking!',
                    username: 'lernantino',
                },
            ],
        });

        const thought3 = await Thought.create({
            thoughtText: "I'm Thinking",
            username: 'cgwol',
            reactions: [],
        });

        user1.thoughts.push(thought1._id);
        user2.thoughts.push(thought2._id);
        user2.thoughts.push(thought3._id);
        await user1.save();
        await user2.save();

        console.log('Sample data seeded succesfully!');

    } catch (error) {
        console.error('Error seeding the database: ', error);
    }
    process.exit(0);
});
