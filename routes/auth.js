/**
 * Created by jxy on 19/01/16.
 */
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    /*app.get('/', function(req, res) {
        res.render('./auth/signup'); // load the index.ejs file
        //res.render('auth.ejs');
    });*/

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('./auth/login');
    });

    // process the login form
    //app.post('/login', passport.authenticate('local-login', {
    //    successRedirect : '/profile', // redirect to the secure profile section
    //    //failureRedirect : '/login', // redirect back to the signup page if there is an error
    //    // failureFlash : true // allow flash messages
    //    })
    //);

     app.post('/login',
            passport.authenticate('local-login'),
            function(req, res){ //this function called only when authentication successful
                res.json({'destPage': '/profile'}); //return redirect page
            }

        );

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('./auth/signup');
    });

    // process the signup form
    //app.post('/signup', passport.authenticate('local-signup', {
    //    successRedirect : '/profile', // redirect to the secure profile section
    //    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    //    failureFlash : true // allow flash messages
    //}));
    app.post('/signup', passport.authenticate('local-signup'),
                        function(req, res){
                            res.json({'destPage': '/profile'});
                        }
    );

    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
        res.statusCode = 200;
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}