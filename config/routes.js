var controllers = require('../app/controllers');

exports.init = function( app ){

    app.post( '/add', controllers.users.add );

}