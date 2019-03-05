var Event = require('./models/event');
var mongoose = require('mongoose');

mongoose.plugin(schema => { schema.options.usePushEach = true });
module.exports = function(app, passport) {

    app.get('/', userLogoutCheck, function(req, res) {
        // res.render('index.ejs');
        res.render('index.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', userLogoutCheck, passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));
    app.post('/Test',function (req,res) {
        console.log(req.body);
    });
    app.get('/signup', userLogoutCheck, function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });

    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/profile', userLogInCheck, function(req, res) {
        console.log("==========inside profile load =============");
        res.cookie('username', req.user.local.username, { httpOnly: true });
        res.render('profile.ejs', {
            user: req.user,
            id :req.user.local.username
        });
    });

    app.get('/getLog', function(req, res) {

        mongoose.createConnection('mongodb://localhost:27017/Aweb', function(err, db) {
            if (err) {
                console.log(err);
                throw err;
            }

            // data = '';
            console.log(req.cookies.username);
            var id = req.cookies.username;
            Event.find({UserId: id}, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                    res.render('userActivityLog.ejs',{
                        data: data,
                        user: id
                    });

                }
            })
        });
    });
    app.get('/layout', function(req, res) {

        mongoose.createConnection('mongodb://localhost:27017/AWeb', function(err, db) {
            if (err) {
                console.log(err);
                throw err;
            }

            // data = '';
            console.log(req.cookies.username);
            var id = req.cookies.username;
            Event.find({UserId: id}, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                    res.render('layout.ejs',{
                        data: data,
                        user: id
                    });

                }
            })
        });
    });

    app.get('/getDashboard', function(req, res) {

        mongoose.createConnection('mongodb://localhost:27017/AWeb', function(err, db) {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log("Inside get dashboard api");
            // data = '';
            console.log(req.cookies.username);
            var id = req.cookies.username;
            Event.find({}, function (err, data) {
               if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                    res.render('dashboard.ejs',{
                        data: data,
                        user: id
                    });
                }
            })
        });
    });

    app.post('/behavior', function(req, res) {
        if (req.cookies.username && req.body.request.hasOwnProperty('timestamp')
            && req.body.request.hasOwnProperty('url') && req.body.request.hasOwnProperty('activity') ) {
            //TODO : Clean this up
            var URL = req.body.request.url;
            var Date = req.body.request.timestamp;
            var Activity = req.body.request.activity;
            var Tags = req.body.request.hasOwnProperty('tags') ? req.body.request.tags : null;
            var Coordinates = req.body.request.hasOwnProperty('coords') ? req.body.request.coords : null;
            var Data = req.body.request.hasOwnProperty('data') ? req.body.request.data : null;

            var Description = "";
            if(Activity === 'UpVote!')
                Description = "Tags of Questions are :  " + req.body.request.tags;
            if(Activity === 'DownVote!')
                Description = "Tags of Questions are :  " + req.body.request.tags;
            if(Activity === 'BookMark!')
                Description = "Tags of Questions are :  " + req.body.request.tags;
            if(Activity === 'UnBookMark!')
                Description = "Tags of Questions are :  " + req.body.request.tags;
            if(Activity === 'EditSuggest!')
                Description = "Tags of Questions are :  " + req.body.request.tags;
            if(Activity === 'ClickOnQuestion!')
                Description = "Text of the question is:"+req.body.request.url;
            if(Activity === 'TagClick!')
                Description = "Tag:  " + req.body.request.url + "   was clicked!";
            if(Activity === 'ChangePage!')
                Description = "Page is Changed!";
            if(Activity === 'PostQue!')
                Description = "User asked:  " + req.body.request.url;
            if(Activity === 'PostAns!')
                Description = "User Wants to answer:  " + req.body.request.url;
            if(Activity === 'Copy')
                Description = "Copied Text: " + Data; //Selected Text
            if(Activity === 'ClickComment!')
                Description = "Comment was clicked"; //Selected Text
            if(Activity === 'PageBrowse!')
                Description = "Browsed Link:" + req.body.request.url;
            console.log()
            const log =  Event({
                URL: URL,
                Date: Date,
                Activity: Activity,
                Tags:Tags,
                Description: Description,
                Coordinates : Coordinates,
                UserId: req.cookies.username
            });
            log.save(function (err, post) {
                if(err) {
                    console.log(err);
                } else {
                    res.send("Success");
                }
            })
        } else {
            res.send(req.body);
        }
        
    });
    app.get('/interest',function (req,res) {
        res.render('interest');
    });
    app.get('/logout', function(req, res) {
        req.logout();
        res.clearCookie('username');
        res.redirect('/');
    });

    app.get('/avgUserDasboard', function(req, res) {

        mongoose.createConnection('mongodb://localhost:27017/AWeb', function(err, db) {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log(req.cookies.username);
            var id = req.cookies.username;
            Event.find({}, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                    res.render('newDashBoard.ejs',{
                        data: data,
                        userId: id
                    });
                    // res.render('log.jade', {data: data});

                }
            })
        });
    });
    app.get('/tagDashboard', function(req, res) {

        mongoose.createConnection('mongodb://localhost:27017/AWeb', function(err, db) {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log("Inside get dashboard api");
            // data = '';
            console.log(req.cookies.username);
            var id = req.cookies.username;
            Event.find({}, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                    res.render('tagDashboard.ejs'
                        ,{
                        data: data,
                        user: id
                    });
                }
            })
        });
    });
    function userLogInCheck(req, res, next) {
        console.log("in here @@@@@@@@@@@@@@");
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }

    function userLogoutCheck(req, res, next) {
        if (!req.isAuthenticated())
            return next();
        res.redirect('/profile');
    }
}
