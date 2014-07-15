var Routes = function( models, helpers ){

    this.all = function( req, res ){

      models.route.find({ approved: true }, function(error, data){
        if( error ){

          res.json({ status: false, message: error });

        }
        else{
          if( data ){

            res.json({ status: true, data: data });

          }
          else{

            res.json({ status: false, message: 'No existen registros.' });

          }
        }
      });

    }

    this.add = function( req, res ){

        var go = true;
        var name = req.body.name;
        var station = req.body.station;
        var user_name = req.body.user_name;
        var user_email = req.body.user_email;

        if( name == "" ){
          go = false;
          res.json({ status: false, message: 'Es necesario que escriba el nombre de la ruta.' });
        }

        if( station == "" ){
          go = false;
          res.json({ status: false, message: 'Es necesario que escriba el nombre de la estación.' });
        }

        if( user_name == "" ){
          go = false;
          res.json({ status: false, message: 'No se recibió el nombre del usuario.' });
        }

        if( user_email == "" ){
          go = false;
          res.json({ status: false, message: 'No se recibió el correo electrónico del usuario.' });
        }

        if( go ){

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

}

module.exports = Routes;
