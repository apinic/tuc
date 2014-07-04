var Users = function( models, helpers ){

    this.all = function( req, res ){

      modes.route.find({}, function(error, data){
        res.json( data );
      });

    }

    this.add = function( req, res ){

        var name = req.body.name;
        var station = req.body.station;
        var user_name = req.body.user_name;
        var user_email = req.body.user_email;

        models.route.findOne({ name: name, station: station }, function(error,route){
            if( route ){

                res.json({ status: false, message: 'Ya existe un registro. Gracias' });

            }
            else{

                var row = new models.route;
                row.name = name;
                row.station = station;
                row.user = {
                  name: user_name,
                  email: user_email
                };

                row.save(function(err){

                    if( err ){

                        res.json( { status: false, message: err } );

                    }
                    else{

                        res.json( { status: true, message: 'Listo! Ahora solo falta que sea aprobado. Gracias.'  } );

                    }

                });

            }

        });

    }

}

module.exports = Users;
