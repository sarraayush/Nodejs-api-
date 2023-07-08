const express = require("express");

const router = express.Router();

const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = mongoose.model('../models/users');

router.post('/signup' , (req , res , next)=>{

    const user = new User({
        _id : new mongoose.Types.ObjectId(),
        email :  req.body.email,
        passwd :  bcrypt.hash(req.body.password , 10 , ()=>{})
    });
});

router.post('/login', (req , res , next)=>{
         User.find({email : req.body.email}).exec().then(user =>{

            if(user.length() < 1 )
            {
                res.status(401).json({
                    message : "Auth failed"
                });
            }
            bcrypt.compare(req.body.password , User[0].password , (err, result)=>{
                if(err)
                {
                   return  res.status(401).json({
                        message : "Auth failed"
                    });
                }
                if(result)
                {
                   return  res.status(200).json({
                        message : "Auth Successful"
                    });
                }
                res.status(401).json({
                    message : "Auth failed"
                });


            });         //bycrpt ends here
         })
         .catch(err => {
             console.log(err);
             res.status(500).json({
                err : error 
             });
         }

         );
});

module.exports = router;