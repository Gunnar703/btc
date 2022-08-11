const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
    /*
        Show all users
    */
   try {
    const users = await User.find();
    res.render('users/index', {
        users
    });
   } catch (err) {
    res.redirect('/');
    console.error(err);
   }
});

router.get('/new', (req, res) => {
    // Create new user GET form route
    res.render('users/new', {
        user: null
    });
});

router.post('/', async (req, res) => {
    /*
    Create user POST route:
    expects POST request with body attrbutes name(string), email(string), password (string),
    and accountBalance (number), isStaff (boolean), isPlayer (boolean), isMember (boolean), isInstructor (boolean)
    */
    const userTypes = [];
    // sets types of user in order of decreasing scope (i.e. staff has the most access, instructor a little less, member a little less, etc.)
    if (req.body?.isStaff) userTypes.push('staff');
    if (req.body?.Isinstructor) userTypes.push('instructor');
    if (req.body?.isMember) userTypes.push('member');
    if (req.body?.isPlayer) userTypes.push('player');

    // creates new user from mongoose model
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        userTypes,
        accountBalance: 0
    });
    try {
        // tries to save new user, redirects to user list page
        const newUser = await user.save();
        res.redirect('/users');
    } catch (err) {
        res.redirect('/users');
        console.error(err);
    }
});

router.get('/:id/edit', async (req, res) => {
    // Edit a specific user
    try {
        const user = await User.findById(req.params.id);
        res.render('users/edit', {
            user
        });

    } catch (err) {
        res.render('users/edit', {
            errorMessage: 'Error rendering edit user page.'
        });
        console.error(err);
    }
});

router.put('/:id', async (req, res) => {
    // Update user information in the database
    let user;
    try {
        // Construct new userTypes array
        const userTypes = [];
        if (req.body?.isStaff) userTypes.push('staff');
        if (req.body?.Isinstructor) userTypes.push('instructor');
        if (req.body?.isMember) userTypes.push('member');
        if (req.body?.isPlayer) userTypes.push('player');
        // Update user object in database
        user = await User.findById(req.params.id);
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.userTypes = userTypes;
        await user.save();
        // res.redirect('/users/:id');
        res.redirect('/users');
    } catch (err) {
        console.error(err);
        res.render('users/index', {
            users: await User.find(),
            errorMessage: 'Error editing user.'
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        res.render('users/user', {
            user: await User.findById(req.params.id)
        });
    } catch (err) {
        console.error(err);
        res.render('users/index', {
            users: await User.find(),
            errorMessage: 'Error displaying user information.'
        })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.render('users/index', {
            users: await User.find(),
            successMessage: 'Successfully deleted user.'
        });
    } catch (err) {
        console.error(err);
        res.render('users/:id', {
            user: await user.findById(req.params.id),
            errorMessage: 'Error deleting user.'
        })
    }
});

module.exports = router;