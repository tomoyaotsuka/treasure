"use strict"
const fs = require('fs');
const path = require('path');
const dir = process.argv[2] || './dist';

const fileList = ( dir ) => {
  let results = [];
  let promises = [];

  return new Promise( ( res, rej ) => {
    fs.readdir( dir, ( err, files ) => {
      if ( err ) return rej( err );

      files.forEach( file => {
        const fp = path.join( dir, file );
        if ( fs.statSync( fp ).isDirectory() ) {
          promises.push( fileList( fp ) );
        }
        else {
          if ( fp.match(/html/g) ) results.push( fp.replace( /dist\//g, '' ) );
        }
      });

      Promise.all( promises )
        .then( ary => {
          ary.forEach( files => {
            results = results.concat( files );
          });
          res( results );
        });
    });
  });
}

const generate = files => {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
      sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  for ( file of files ) {
    sitemap += '<url>\n';
      sitemap += `<loc>http://www.shiseido.co.jp/${file}</loc>\n`;
      sitemap += '<priority>0.7</priority>\n';
      sitemap += `<xhtml:link rel="alternate" media="only screen and (max-width: 640px)" href="http://www.shiseido.co.jp/sp/${file}" />\n`;
    sitemap += '</url>\n';
  }

  sitemap += '</urlset>';

  // console.log( sitemap );
  fs.writeFile( './dist/sitemap.xml', sitemap );
}

fileList( dir )
  .then ( files => {
    return files;
  })
  .then ( files => {
    generate( files );
  })
  .catch ( err => {
    console.log( 'error', err );
  });
