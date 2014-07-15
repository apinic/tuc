// Set default to development
var environment = process.env.NODE_ENV || 'development'

/**
 * @description Read all files and make export for file
 *              ignoring index file.
 * @type {exports}
 */

var fs = require( 'fs' );
var path = require( 'path' );

var files = fs.readdirSync(  __dirname + '/' + environment );

files.forEach(function( file ){
    var file_name = path.basename( file, '.js' );

    if( file_name != 'index' ){
        exports[file_name] = require( './' + environment + '/' + file_name );
    }
});


exports.routes = require('./routes');