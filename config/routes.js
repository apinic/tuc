var controllers = require('../app/controllers');

exports.init = function( app ){

    app.post( '/user/auth', controllers.users.auth );

    app.post( '/user/add', controllers.users.add );

    app.post( '/route/add', controllers.route.add );

}
