var Users = function( models, helpers ){

    this.auth = function( req, res ){

      var email = req.body.email;
      var password = req.body.password;

      models.user.findOne({ email: email, password: password }, function(error,user){

        if( user ){
          res.json({ status: true, user: user });
        }
        else{
          res.json({ status: false, message: 'Datos incorrectos. Intenta nuevamente.' });
        }

      });

    }

    this.add = function( req, res ){

        var email = req.body.email;
        var name = req.body.name;
        var password = req.body.password;


        models.user.findOne({ email: email }, function(error,user){
            if( user ){

                res.json({ status: false, message: 'Ya se ha registrado un usuario con el correo ' + email });

            }
            else{

                var row = new models.user;
                row.email = email;
                row.name = name;
                row.password = password;

                row.save(function(err){

                    if( err ){

                        res.json( { status: false, message: err } );

                    }
                    else{

                        res.json( { status: true, name: name, email: email, id: row._id  } );

                    }

                });

            }

        });

    }

}

module.exports = Users;
