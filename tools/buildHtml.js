// This script copies src/index.html into /dist/index.html
// and adds TrackJS error tracking code for use in production
// when useTrackJs is set to true below and a trackJsToken is provided.
// This is a good example of using Node and cheerio to do a simple file transformation.
// In this case, the transformation is useful since we only want to track errors in the built production code.

// Allowing console calls below since this is a build file.
/* eslint-disable no-console */

import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

const useTrackJs = false; // If you choose not to use TrackJS, just set this to false and the build warning will go away.
const trackJsToken = ''; // If you choose to use TrackJS, insert your unique token here. To get a token, go to https://trackjs.com

fs.readFile('src/index.html', 'utf8', (readError, markup) => {
    if (readError) {
        return console.log(readError);
    }

    const $ = cheerio.load(markup);

    // since a separate spreadsheet is only utilized for the production build, need to dynamically add this here.
    $('head').append('<link rel="stylesheet" href="/styles.css">');

    fs.writeFile('dist/index.html', $.html(), 'utf8', (writeError) => {
        if (writeError) {
            return console.log(writeError);
        }
        console.log('index.html written to /dist'.green);

        return writeError;
    });

    return readError;
});