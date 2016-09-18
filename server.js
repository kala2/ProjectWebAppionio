var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var moment = require('moment');
var moment = require('moment-timezone');
var hbs = require('hbs');
var fs = require('fs');
var path = require("path");
var mongojs = require('mongojs');
var ejs = require('ejs');
var multer = require('multer'); // v1.0.5
var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/webappionio';
var db = mongoose.connect(connectionString);
app.engine('html', hbs.__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/public/views/comments');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({
    secret: 'placeyourpersonalsecrethere',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.set('public/views', path.join(__dirname, 'public/views'));

//defining User Model

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    first: String,
    last: String,
    email: String,
    img: {
        data: Buffer,
        contentType: String
    },
    roles: [String]
});


//defining Resources Model

var ResourcesSchema = mongoose.Schema({
    name: String,
    serialnumber: String,
    modelno: String,
    description: String
});

//defining Log Model

var LogSchema = mongoose.Schema({
    creatorname: String,
    content: String,
    date: String,
    resource: String

});


//defining Articles Model

var ArticleSchema = mongoose.Schema({
    _creatorname: String,
    title: String,
    body: String,
    resource: String,
    published: String,
    comments: [{
        _commentorname: String,
        content: String,
        date: String,
        replies: [{
            _repliername: String,
            repliercontent: String,
            replydate: String,
        }]
    }]
});




var User = mongoose.model("User", UserSchema);
var Resources = mongoose.model("Resources", ResourcesSchema);
var Log = mongoose.model('Log', LogSchema);
var Articles = mongoose.model("Articles", ArticleSchema);




// Passport User Authorization

passport.use(new LocalStrategy(
    function(username, password, done) {

        User.findOne({
            username: username,
            password: password
        }, function(err, user) {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        });
    }));

passport.serializeUser(function(user, done) {

    done(null, user);


});

passport.deserializeUser(function(user, done) {

    done(null, user);


});


//User Login


app.post("/login", passport.authenticate('local'), function(req, res) {
    var user = req.user;
    console.log(user);

    res.json(user);

});

//User Logout

app.post("/logout", function(req, res) {
    req.logout();
    res.sendStatus(200);

});

//Check if user is logged in


app.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

//User registration

app.post("/register", function(req, res) {
    var newUser = new User(req.body);
    User.findOne({
        username: newUser.username
    }, function(err, existingUser) {
        if (existingUser == null) {
            newUser.roles = ['mainuser'];
            newUser.save(function(err, user) {
                req.login(user, function(err) {
                    if (err) {
                        return next(err);
                    }
                    res.json(user);

                });

            });
        } else {
            res.json(null);

        }
    })

});

var auth = function(req, res, next) {
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};

//Update user credentials

app.put("/profile", function(req, res, next) {
    var user = req.body;
    var password = req.body.password;
    var password2 = req.body.password2;
    var email = req.body.email;
    User.findById(user._id, function(err, user) {
        if (user != null) {
            user.update({
                password: password,
                email: email
            }, function(err, results) {
                if (err) {
                    res.send("there was a problem updating the information: " + err);
                } else {
                    res.format({
                        json: function() {
                            res.json(results);
                        }
                    });
                }
            });

        } else {
            res.json(null);
        }


    });
});

// Return All resources from DB 


app.get("/resources", function(req, res) {

    Resources.find(function(err, docs) {
        res.json(docs);

    });
});

// Create Resource and save it in collection "resources"


app.post("/resources", function(req, res) {
    var resources = new Resources(req.body);
    resources.save(function(err, doc) {
        console.log(doc);

        res.json(doc);
    });

});

//Delete a specific Resource for the Collection "resources"

app.delete("/resources/:id", function(req, res) {
    var id = req.params.id;
    console.log(id);
    Resources.remove({
        _id: mongojs.ObjectId(id)
    }, function(err, doc) {
        res.json(doc);
    });
});

//Return a specific resource

app.get("/resources/:id", function(req, res) {
    var id = req.params.id;
    console.log(id);
    Resources.findOne({
        _id: mongojs.ObjectId(id)
    }, function(err, results) {
        res.json(results);
    });
});

//Update a specific resource

app.put("/resources/:id", function(req, res) {
    var resource = req.body;
    var name = req.body.name;
    var serialnumber = req.body.serialnumber;
    var modelno = req.body.modelno;
    var description = req.body.description;
    Resources.findById(resource._id, function(err, resource) {
        resource.update({
            name: name,
            serialnumber: serialnumber,
            modelno: modelno,
            description: description
        }, function(err, results) {
            if (err) {
                res.send("there was a problem updating the information: " + err);
            } else {
                res.format({
                    json: function() {
                        res.json(results);
                    }
                });
            }
        })
    });
});

//Get all resources from the collection "Resouces"

app.get("/home", function(req, res) {

    Articles.find(function(err, docs) {
        res.json(docs);

    });
});

//Find specific articles based on given product ID

app.get('/home/:id', function(req, res) {
    var id = req.params.id;
    var date = moment().tz("Europe/Athens").format("DD/MM/YY HH:mm");
    Articles.find({
        resource: mongojs.ObjectId(id)
    }, function(err, docs) {
        res.json(docs);
    });
});

app.get('/home/article/:id', function(req, res) {
    var id = req.params.id;
    Articles.find({
        _id: mongojs.ObjectId(id)
    }, function(err, docs) {
        res.json(docs);
    });
});

app.get('/home/article/:id2', function(req, res) {
    var id2 = req.params.id2;
    Articles.find({
        resource: id2
    }, function(err, docs) {
        res.json(docs);
    });
});

//push the comment into the article

app.put("/home/:id", function(req, res) {
    var id = req.params.id;
    var date = moment().tz("Europe/Athens").format("DD/MM/YY HH:mm");
    Articles.findByIdAndUpdate(
        id, {
            $push: {
                "comments": {
                    _commentorname: req.user.username,
                    content: req.body.comment,
                    date: date
                }
            }
        }, {
            safe: true,
            upsert: true,
            new: true
        },
        function(err, results) {
            if (err) {
                res.send("there was a problem updating the information: " + err);
            } else {
                res.format({
                    json: function() {
                        res.json(results);
                    }
                });
            }
        }
    );
});

//update a specific article 

app.put("/home/editarticle/:id/:title/:body", function(req, res) {
    var id = req.params.id;
    var article = req.body;
    var title = req.params.title;
    var body = req.params.body;
    Articles.findById(id, function(err, article) {
        article.update({
            title: title,
            body: body
        }, function(err, results) {
            if (err) {
                res.send("there was a problem updating the information: " + err);
            } else {
                res.format({
                    json: function() {
                        res.json(results);
                    }
                });
            }
        })
    });

});

//pushing a reply into a existing comment

app.put("/home/:idarticle/:idcomment", function(req, res) {
    var idarticle = req.params.idarticle;
    var idcomment = req.params.idcomment;
    var replydate = moment().tz("Europe/Athens").format("DD/MM/YY HH:mm");
    Articles.update({
            "_id": idarticle,
            "comments._id": idcomment
        }, {
            $push: {
                "comments.$.replies": {
                    _repliername: req.user.username,
                    repliercontent: req.body.reply,
                    replydate: replydate
                }
            }
        }, {
            safe: true,
            upsert: true,
            new: true
        },
        function(err, results) {
            if (err) {
                res.send("there was a problem updating the information: " + err);
            } else {
                res.format({
                    json: function() {
                        res.json(results);
                    }
                });
            }
        }
    );
});

//Delete Comment from the article

app.put("/home/article/:id/:id2", function(req, res) {
    var id = req.params.id;
    var id2 = req.params.id2;
    var username = req.user.username;
    Articles.findByIdAndUpdate(
        id, {
            $pull: {
                "comments": {
                    _id: id2,
                    _commentorname: username
                }
            }
        },
        function(err, results) {
            if (err) {
                res.send("there was a problem updating the information: " + err);
            } else {
                res.format({
                    json: function() {
                        res.json(results);
                    }
                });
            }
        }
    );
});

//Delete a reply from a specific comment

app.put("/home/article/:idarticle/:idcomment/:idreply", function(req, res) {
    var idarticle = req.params.idarticle;
    var idcomment = req.params.idcomment;
    var idreply = req.params.idreply;
    var username = req.user.username;
    Articles.update({
        "_id": idarticle,
        "comments._id": idcomment
    }, {
        $pull: {
            "comments.$.replies": {
                _id: idreply,
                _repliername: username
            }
        }
    }, function(err, results) {
        if (err) {
            res.send("there was a problem updating the information: " + err);
        } else {
            res.format({
                json: function() {
                    res.json(results);
                }
            });
        }
    });
});

//Remove a specific article

app.delete("/home/:id", function(req, res) {
    var id = req.params.id;
    var username = req.user.username;
    console.log(id);
    Articles.remove({
        _id: mongojs.ObjectId(id),
        _creatorname: username
    }, function(err, doc) {
        res.json(doc);
    });
});

app.delete("/deletearticles/:id", function(req, res) {
    var id = req.params.id;
    Articles.remove({
        resource: mongojs.ObjectId(id)
    }, function(err, doc) {
        res.json(doc);
    });
});

app.delete("/deletelogs/:id", function(req, res) {
    var id = req.params.id;
    Log.remove({
        resource: mongojs.ObjectId(id)
    }, function(err, doc) {
        res.json(doc);
    });
});



//Post a new article in the collection "articles"

app.post('/new-post/:id', function(req, res) {
    var article = new Articles({
        _creatorname: req.user.username,
        title: req.body.title,
        body: req.body.body,
        resource: req.params.id,
        published: moment().format('D/M/YYYY')
    });
    article.save(function(err, doc) {
        console.log(doc);

        res.json(doc);
    });
});



//Get all logs from the collection "logs"

app.get("/activitylog", function(req, res) {
    Log.find(function(err, docs) {
        res.json(docs);

    });
});

//Find a specific log based on a given product ID

app.get("/activitylogid/:id", function(req, res) {
    var id = req.params.id;
    Log.find({
        resource: mongojs.ObjectId(id)
    }, function(err, docs) {
        res.json(docs);
    });
});

//Post a article in the collection "articles"

app.post("/activitylog", function(req, res) {
    var content = req.body.content;
    var creatorname = req.user.username;
    var resource = req.body.resource;
    var date = moment().tz("Europe/Athens").format("DD/MM/YY HH:mm");
    var logs = new Log(req.body);
    logs.creatorname = creatorname;
    logs.resource = resource;
    logs.content = content;
    logs.date = date;
    logs.save(function(err, doc) {
        res.json(doc);
    });
});

//Delete a specific log from the collection "logs"

app.delete("/activitylog/:id", function(req, res) {
    var id = req.params.id;
    var username = req.user.username;
    console.log(id);
    Log.remove({
        _id: mongojs.ObjectId(id),
        creatorname: username
    }, function(err, doc) {
        res.json(doc);
    });
});




var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;


app.listen(port, ip);
console.log('http://localhost:' + port);
