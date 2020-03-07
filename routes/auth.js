const router = require("express").Router();
const db = require("../models");

const passport = require("passport");

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect("/login");
    }
}

//Updates backend DB with logged in user so we can check if they are authenticated or not
const userCheck = (email, token, name) => {
    db.User.findOne({ email: email })
        .then(dbModel => {
            // res.json(dbModel)
            console.log(`DBModel: ${dbModel}`);
            if (dbModel) {
                db.User.findOneAndUpdate(
                    { email: email },
                    { token: token },
                    { name: name }
                )
                    .then(dbModel => console.log(`Updated User: ${dbModel}`))
                    .catch(err => console.log(err));
            } else {
                db.User.create({ email: email, token: token, name: name })
                    .then(dbModel => console.log(` Created User: ${dbModel}`))
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
};

/* GET Google Authentication API. */
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: `${process.env.FRONTEND_URL}`,
        session: true
    }),
    function(req, res) {
        let token = req.user.token;
        let email = decodeURIComponent(req.user.email);
        let name = decodeURIComponent(req.user.name);
        // console.log(req.user);
        userCheck(email, token, name);
        res.redirect(
            `${process.env.FRONTEND_URL}/dashboard?token=${token}&email=${email}&name=${name}`
        );
    }
);

router.get("/google/logout", function(req, res) {
    req.session.destroy();
    res.redirect(`${process.env.FRONTEND_URL}`);
    console.log("triggered");
});

module.exports = router;
