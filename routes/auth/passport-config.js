const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt")

function initialize(passport, getUserByMail, getUserById) {
    const authenticateUser = async (mail, password, done) => {
        let user = getUserByMail(mail);
        if (user == null) {
            return done(null, false, { message: "No user with that mail" });
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Password incorrect" });
            };
        } catch (e) {
            done(e)
        };
    };

    passport.use(new LocalStrategy({ usernameField: "mail" },
    authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    });
}

module.exports = initialize;
