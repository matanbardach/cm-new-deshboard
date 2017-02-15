import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.prod';
import open from 'open';
import compression from 'compression';
import favicon from 'serve-favicon';

/* eslint-disable no-console */

const port = 3000;
const app = express();


app.use(compression());
app.use(favicon(__dirname + '/favicon.ico'));
app.use(express.static('dist'));

app.get('*', function(req, res) {
    res.sendFile(path.join( __dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        open(`http://localhost:${port}`);
    }
});
