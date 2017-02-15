const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');
const favicon = require('serve-favicon');


const port = process.env.PORT || 3000;

app.use(compression());
app.use(favicon(__dirname + '/favicon.ico'));
app.use(express.static(path.join( __dirname, '../dist/')));
app.use('/*', express.static(path.join( __dirname, '../dist/index.html')));


//app.get('*', function(req, res) {
//    res.sendFile(path.join( __dirname, '../dist/index.html'));
//});

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    }
});
