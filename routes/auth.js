const router = require("express").Router();
const passport = require("passport");

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect("/login");
    }
}

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
        let email = encodeURIComponent(req.user.email);
        let name = encodeURI(req.user.name);
        console.log(req.user);
        res.redirect(
            `${process.env.FRONTEND_URL}/dashboard?token=${token}&email=${email}&name=${name}`
        );
    }
);

router.get("/google/logout", function(req, res) {
    req.logout();
    res.redirect(
        `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${process.env.FRONTEND_URL}`
    );
});

module.exports = router;
