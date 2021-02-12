const Register = require("../models/user.register");
const bcrypt = require("bcryptjs");
const validator = require('validator');


// signup
exports.userRegistration = async (req, res) => {
    try {
        const username = req.body.username,
            email = req.body.email,
            pass = req.body.pass;

        if (!validator.isEmail(email)) {
            res.json("Email is invaild")
        }
        // else if (!validator.isStrongPassword(value)) {
        //     throw new Error("Password Is not Strong");
        // }
        else {
            const registerUser = new Register({
                username: req.body.username,
                email: req.body.email,
                pass: req.body.pass,

            });
            const createUser = await registerUser.save()
                .then(() => {
                    res.json({
                        "code": "success",
                        "message": "Successfully Added !!"
                    })
                })
                .catch(error => { throw error });
        }


        // if (pass != cpass) {
        //     res.status(200).render("register", {
        //         otherErr: "Password are Not Matching !!",
        //     });
        // } else {
        //     const registerUser = new Register({
        //         firstname: req.body.fname,
        //         lastname: req.body.lname,
        //         email: req.body.email,
        //         gender: req.body.gender,
        //         password: req.body.pass,
        //         confirmpassword: req.body.cpass,
        //     });

        //     //  Midleware For JWT OAuth
        //     const token = await registerUser.generateOAuthToken();

        //     const createUser = await registerUser.save().catch(error => { throw error });
        //     res.status(201).render("register", {
        //         success: "Successfully Added !!",
        //     });
        // }
    } catch (error) {
        res.status(400).send(error.message);
        // res.status(200).render("register", {
        //     err: error.message,
        // });
    }
}