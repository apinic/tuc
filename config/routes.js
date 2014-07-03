var controllers = require('../app/controllers');

exports.init = function( app ){

    app.post( '/auth', controllers.users.auth );

    app.post( '/add', controllers.users.add );

}
