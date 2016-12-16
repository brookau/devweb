#!/bin/env node
/*
 *  Author: Jason Ho 2014
 *  NodeJS
 *

 */

var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    app = express(),
    request = require("request"),
    qs = require('querystring'),
    DEPLOY = (process.env.DEPLOY || process.argv[2]) === 'build' ? true : false;

// Authentication module.
var auth = require('http-auth');
var basic = auth.basic({
    realm: "Protected Area.",
    file: __dirname + "/users.htpasswd" // gevorg:gpass, Sarah:testpass ...
});



request = request.defaults({
    jar: true
});

app.configure(function() {
    app.use(auth.connect(basic));

    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.favicon());
    app.use(express.session({
        secret: 'abc12345',
        cookie: {
            httpOnly: false
        }
    }));

    app.use(app.router);
    if (DEPLOY) {
        console.log('STATIC_DIR '+ __dirname + '/build');
        app.use("/", express.static(path.join(__dirname, 'build')));
    } else {
        app.use("/", express.static(path.join(__dirname, 'src')));
    }


    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));

    if (DEPLOY) {
         app.get('/[^\.]+$', function(req, res){
            res.set('Content-Type', 'text/html')
                .sendfile(__dirname + '/build/index.html');
        });
    } else {
        app.get('/[^\.]+$', function(req, res){
            res.set('Content-Type', 'text/html')
                .sendfile(__dirname + '/src/index.html');
        });
    }

});


/*  ================================================================  */
/*  Helper functions.                                                 */
/*  ================================================================  */

/**
 *  terminator === the termination handler
 *  Terminate server on receipt of the specified signal.
 *  @param {string} sig  Signal to terminate on.
 */
var terminator = function(sig) {
    if (typeof sig === "string") {
        console.log('%s: Received %s - terminating sample app ...',
            Date(Date.now()), sig);
        process.exit(1);
    }
    console.log('%s: Node server stopped.', Date(Date.now()));
};


/**
 *  Setup termination handlers (for exit and a list of signals).
 */
var setupTerminationHandlers = function() {
    //  Process on exit and signals.
    process.on('exit', function() {
        terminator();
    });

    // Removed 'SIGPIPE' from the list - bugz 852598.
    ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
        'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
    ].forEach(function(element, index, array) {
        process.on(element, function() {
            terminator(element);
        });
    });
};

setupTerminationHandlers();

var port = Number(process.env.PORT || 8080);

//  Start the app on the specific interface (and port).
app.listen(port, function() {
    console.log('%s: Node server started on port: %d...',
        Date(Date.now()), port);
});
