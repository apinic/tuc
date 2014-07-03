exports.setup = function(_mongoose,_db){

    var file_name = require('path').basename( __filename, '.js' );

    var schema = _mongoose.Schema({
        name: {
            type: String,
            index: {
                unique: true
            }
        },
        station: {
            type: String,
            index: {
                unique: true
            }
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        approved: {
            type: Boolean,
            default: false
        },
        user: {
          name: String,
          email: String
        }
    });

    _db.model( file_name, schema);

    var data = _db.model( file_name );

    return data;
};
