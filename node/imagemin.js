// const imagemin = require('imagemin');
// const imageminMozjpeg = require('imagemin-mozjpeg');
// const imageminPngquant = require('imagemin-pngquant');
// const imageminGifsicle = require('imagemin-gifsicle');
//
// imagemin( [ 'src/images/**/*.{jpg,png,gif}' ], 'dist/img', {
//     plugins: [
//       imageminMozjpeg(),
//       imageminPngquant({ quality: '65-80' }),
//       imageminGifsicle()
//     ]
// }).then( files => {
//     // console.log(files);
//     //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
// });

'use strict';

var path = require('path');
var readline = require('readline');
var Imagemin = require('imagemin');

var outdir = process.env.PWD; // Default output folder.
var verbose = false; // Default no logging.

// The folder name specified MUST exist in the `glob` pattern of the npm-script.
var DEST_SUBROOT_FOLDER = 'images';

// Nice ticks for logging aren't supported via cmd.exe
var ticksymbol = process.env.npm_config_shell.indexOf('bash') !== -1 ? '✔' : '√';

var rl = readline.createInterface({
    input: process.stdin,
    output: null,
    terminal: false
});

// Handle the optional `-o` argument for the destination folder.
if (process.argv.indexOf('-o') !== -1) {
    outdir = process.argv[process.argv.indexOf('-o') + 1];
}

// Handle the optional `-v` argument for verbose logging.
if (process.argv.indexOf('-v') !== -1) {
    verbose = true;
}

/**
 * Utilizes the Imagemin API to create a new instance for optimizing each image.
 * @param {String} srcpath - The filepath of the source image to optimize.
 * @param {String} destpath - The destination path to save the resultant file.
 * @param {Function} - The relevent `use` plugin (jpegtran|optipng|gifsicle).
 */
function imagemin(srcpath, destpath, plugin) {
    var im = new Imagemin()
        .src(srcpath)
        .dest(destpath)
        .use(plugin);

    im.optimize(function (err, file) {
        if (err) {
            console.error('Error: ' + err);
            process.exit(1);
        }
        if (file && verbose) {
            console.log('\x1b[32m%s\x1b[0m', ticksymbol, destpath);
        }
    });
}

/**
 * Obtains the destination path and file suffix from the original source path.
 * @param {String} srcpath - The filepath for the image to optimize.
 * @return {{dest: String, type: String}} dest path and ext (.jpg|.png|.gif).
 */
function getPathInfo(srcpath) {
    var ext = path.extname(srcpath),
        parts = srcpath.split(path.sep),
        subpath = parts.slice(parts.indexOf(DEST_SUBROOT_FOLDER), parts.length);

    subpath.unshift(outdir);

    return {
        dest: path.normalize(subpath.join(path.sep)),
        ext: ext
    };
}

/**
 * Triggers the relevent imagemin process according to file suffix (jpg|png|gif).
 * @param {String} srcpath - The filepath of the image to optimize.
 */
function optimizeImage(srcpath) {
    var p = getPathInfo(srcpath);

    switch (p.ext) {
    case '.jpg':
        imagemin(srcpath, p.dest, Imagemin.jpegtran({ progressive: true }));
        break;
    case '.png':
        imagemin(srcpath, p.dest, Imagemin.optipng({ optimizationLevel: 5 }));
        break;
    case '.gif':
        imagemin(srcpath, p.dest, Imagemin.gifsicle({ interlaced: true }));
        break;
    }
}

// Read each line from process.stdin (i.e. the filepath)
rl.on('line', function(srcpath) {
    optimizeImage(srcpath);
});
