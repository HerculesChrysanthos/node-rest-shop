const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if(user.length){
            return res.status(409).json({
                message: "Mail alredy exists."
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                    .then(result => {
                        res.status(201).json({
                            message: 'User created'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            })
        }
    })
    .catch();
    
    
});

router.delete("/:userId", (req, res, next) => {
    const id = req.params.userId

    User.deleteOne({ _id: id })
    .exec()
    .then(result => {
        if(result.deletedCount == 0){
            res.status(404).json({
                error: `User with id ${id} not found.`
            });
        } else {
            res.status(200).json({
                message: `User with id ${id} has been deleted.`
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

module.exports = router;