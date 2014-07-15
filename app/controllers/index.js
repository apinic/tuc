/**
 * @description Read all files and make export for file
 *              ignoring index file.
 * @type {exports}
 */

var fs = require( 'fs' );
var path = require( 'path' );
var models = require( '../models' );
var helpers = require( '../helpers' );

var files = fs.readdirSync( __dirname );

files.forEach(function( file ){
    var file_name = path.basename( file, '.js' );

    if( file_name != 'index' ){
        var subModule = require( './' + file_name );
        exports[file_name] = new subModule( models, helpers );
    }
});