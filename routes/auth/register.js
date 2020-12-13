const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const bcrypt = require("bcrypt")
let users = require("./users");

// SETTINGS
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/", (req, res) => {
    res.render("register");
});

router.post("/", async (req, res) => {
    let body = req.body;

    try {
        let hashedPassword = await bcrypt.hash(body.password, 10);

        let newUser = {
            id: uuid.v4(),
            nick: body.nick,
            name: body.fName + " " + body.lName,
            mail: body.mail,
            password: hashedPassword
        }
        users.push(newUser);
        res.redirect("/auth/login");
    } catch {
        res.redirect("/");
    };
});

// EXPORT
module.exports = router;
