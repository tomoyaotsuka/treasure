const browserSync = require('browser-sync');

const argv = [];
for ( const key of Object.keys( process.argv ) ) {
  const value = process.argv[ key ];
  argv[ key ] = value;
  console.log( argv[ key ] );
}

const startPath = '';

browserSync({
  server:    "dist",
  files:     "dist",
  startPath: startPath
});
